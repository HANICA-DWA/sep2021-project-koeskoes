const express = require("express");
const router = express.Router();
const generateRandomFileName = require('../commonFunctions/generateRandomFileName');
const fileUpload = require("express-fileupload");
const MailModule = require("../commonFunctions/sendMails");
const mail = new MailModule();
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const mongoose = require("mongoose");
require("../model/uploadModel");

const Uploads = mongoose.model("UploadSchema");

/**
 * middleware for Express that provides easy way to handle file upload.
 */
 router.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 1073741824,
    },
  })
);

/**
 * This post request will send a mail to the receiver of a specific order.
 */
router.post("/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  order.textCodeSend = true;

  const orderSave = await order.save();

  if (orderSave) {
    const mailInfo = await mail.sendTextCode(
      order.emailReceiver,
      order.nameReceiver,
      order.nameGifter,
      order.textCode
    );

    if (mailInfo.status === 'error') {
      order.textCodeSend = false;
    
      await order.save();
    }

    return res.json(mailInfo);
  }

  return res.json({status: 'error', message:'Tekstcode is niet verstuurd, probeer het later opnieuw'});
});

/**
 * This post request will send a mail to the buyer of a specific order when the video has been watched.
 */
router.post("/notification/video/:textCode/watched", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  const mailInfo = await mail.sendReminderVideoWatched(
    order.emailGifter,
    order.nameGifter,
    order.nameReceiver
  );

  res.send(mailInfo);
});

/**
 * This post request will send a mail to the buyer of a specific order if a video hasn't been uploaded yet.
 */
router.post("/notification/video/:textCode/upload", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  const mailInfo = await mail.sendReminderUploadVideo(
    order.emailGifter,
    order.nameGifter
  );

  res.send(mailInfo);
});

/**
 * This post request will send a mail to the buyer when they received a text reaction.
 */
router.post("/reaction/text/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  const mailInfo = await mail.sendTextReaction(
    order.emailGifter,
    order.nameGifter,
    order.nameReceiver,
    req.body.message
  );

  res.send(mailInfo);
});

router.post("/reaction/video/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  const mailInfo = await mail.sendVideoReaction(
    order.emailGifter,
    order.nameGifter,
    order.nameReceiver,
    order.textCode
  );

  res.send(mailInfo);
});

router.patch("/reaction/sent/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  order.answerSent = true;

  await order.save();

  res.json({ status: "success", message: "Reaction has been sent" });
});

/**
 * This post request will save the video reaction and send a mail to the buyer including a link to this video.
 */
router.patch("/reaction/video/:textCode", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({ status: "error", message: "No file has been uploaded" });
  }

  const video = req.files.video;

  const { finalFileName, uploadPath } = generateRandomFileName(
    video.name,
    Date.now()
  );

  try {
    const uploadStatus = await video.mv(uploadPath + video.name);

    if (uploadStatus && uploadStatus.err) {
      return res.json({ status: "error", message: "File not uploaded" });
    }

    /**
     * ffprobe HAS to be a callback because this function doesn't return a promise.
     */
    ffmpeg.ffprobe(uploadPath + video.name, async (err, metadata) => {
      let height, duration;
      metadata.streams.forEach((stream) => {
        if (!height && stream.height) {
          height = stream.height;
        }
        if (!duration && stream.duration) {
          duration = stream.duration;
        }
      });

      if (height !== 1080 && height !== 720) {
        fs.unlinkSync(uploadPath + video.name);
        console.log(1);
        return res.json({
          status: "error",
          message: `De kwaliteit van de video die u heeft geupload wordt niet door ons ondersteund. Probeer een andere video te uploaden.`,
        });
      }

      if (
        (height === 1080 && duration > 80) ||
        (height === 720 && duration > 140)
      ) {
        fs.unlinkSync(uploadPath + video.name);
        console.log(2);
        return res.json({
          status: "error",
          message: `De video die u heeft gekozen is te lang. Selecteer een video de minder dan ${
            height === 1080
              ? "1 minuut en 20 seconden"
              : "2 minuten en 20 seconden"
          } is`,
        });
      } else {
        ffmpeg(uploadPath + video.name)
          .on("end", async () => {
            fs.unlinkSync(uploadPath + video.name);
            console.log(5);

            const uploadRecord = await Uploads.findOne({
              textCode: req.params.textCode,
            }).exec();

            try {
              if (uploadRecord.answerVideo) {
                fs.unlinkSync(uploadPath + uploadRecord.answerVideo);
                console.log(3);
              }
            } catch (e) {}

            uploadRecord.answerVideo = finalFileName;

            uploadRecord.save();

            return res.json(uploadRecord);
          })
          .save(uploadPath + finalFileName);
      }
    });
  } catch (e) {
    try {
      fs.unlinkSync(uploadPath + video.name);
      console.log(4);
    } catch (e) {}
    return res.json({
      status: "error",
      message:
        "Er is een fout opgetreden tijdens het uploaden van de video en de video is helaas niet geupload. Probeer het later opnieuw",
    });
  }
});

module.exports = router;
