const express = require("express");
const generateRandomFileName = require("../commonFunctions/generateRandomFileName");
const fileUpload = require("express-fileupload");
const router = express.Router();
const mongoose = require("mongoose");
const MailModule = require("../commonFunctions/sendMails");
const mail = new MailModule();
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
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
 * return orders if record contains 'printed = false'.
 */
router.get("/all/", async (req, res) => {
  const orders = await Uploads.find(
    {
      videoName: { $ne: "" },
      ...req.query,
    },
    {
      _id: 1,
      emailGifter: 1,
      firstNameGifter: 1,
      lastNameGifter: 1,
      emailReceiver: 1,    
      firstNameReceiver: 1,
      lastNameReceiver: 1,
      videoName: 1,
      textCode: 1,
      printed: 1,
      prePrinted: 1,
      textcodeSent: 1,
      answerSent: 1,
    }
  ).exec();

  res.json(orders);
});

/**
 * return order if textCode exists.
 */
router.get("/order/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  res.json(order);
});

/**
 * creating new order in the db from checkoutpage
 */
router.post("/newOrder", async (req, res) => {
  try {
    const newRecord = new Uploads({
      emailGifter: req.body.emailBuyer,
      firstNameGifter: req.body.firstNameBuyer,
      lastNameGifter: req.body.lastNameBuyer,
      emailReceiver: req.body.emailReceiver,
      firstNameReceiver: req.body.firstNameReceiver,
      lastNameReceiver: req.body.lastNameReceiver,
      videoName: "",
      prePrinted: false,
      printed: false,
      answerVideo: "",
    });

    await newRecord.save();

    const savedRecord = await newRecord.setCode();

    await mail.sendMailOrderPlaced(
      req.body.emailBuyer,
      req.body.firstNameBuyer,
      req.body.lastNameBuyer,
      newRecord.textCode
    );

    setTimeout(async () => {
      const checkOrder = await Uploads.findOne({
        textCode: savedRecord.textCode,
        videoName: "",
      }).exec();

      if (checkOrder) {
        mail.sendReminderUploadVideo(
          checkOrder.emailGifter,
          checkOrder.firstNameGifter,
          checkOrder.lastNameGifter,
          checkOrder.textCode
        );
      }
    }, 90000);

    return res.json(newRecord);
  } catch (e) {
    return res.json({ status: "error", message: "Order not created!" });
  }
});

/**
 * if req.files (video) exists, call mongoose method 'generateRandomFileName' that sets the videoName + the current date as 'finalFileName'.
 * upload file (with patch request) if there is no error, if there is an error show the error containing information.
 */
router.patch("/order/video/:textCode", async (req, res) => {
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
        return res.json({
          status: "error",
          message: `De video die u heeft gekozen is te lang. Selecteer een video met een tijd minder dan ${
            height === 1080
              ? "1 minuut en 20 seconden"
              : "2 minuten en 20 seconden"
          }.`,
        });
      } else {
        ffmpeg(uploadPath + video.name)
          .on("end", async () => {
            fs.unlinkSync(uploadPath + video.name);

            const uploadRecord = await Uploads.findOne({
              textCode: req.params.textCode,
            }).exec();

            try {
              if (uploadRecord.videoName) {
                fs.unlinkSync(uploadPath + uploadRecord.videoName);
              }
            } catch (e) {}

            uploadRecord.videoName = finalFileName;

            await uploadRecord.save();

            return res.json(uploadRecord);
          })
          .save(uploadPath + finalFileName);
      }
    });
  } catch (e) {
    try {
      fs.unlinkSync(uploadPath + video.name);
    } catch (e) {}
    return res.json({
      status: "error",
      message:
        "Er is een fout opgetreden tijdens het uploaden van de video. De video is helaas niet geupload. Probeer het later opnieuw.",
    });
  }
});

/**
 * if name receiver exists, find textCode in DB and update both name receiver and name email
 */
router.patch("/new/:textCode/", async (req, res) => {
  if (req.body.firstNameReceiver === "null" || req.body.firstNameReceiver === "" || req.body.lastNameReceiver === "null" || req.body.lastNameReceiver === "") {
    return res.json({ status: "error", message: "No name entered" });
  }

  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  order.firstNameReceiver = req.body.firstNameReceiver;
  order.lastNameReceiver = req.body.lastNameReceiver;

  if (req.body.emailReceiver !== "null" && req.body.emailReceiver !== "") {
    order.emailReceiver = req.body.emailReceiver;
  }

  await order.save();

  res.json({ status: "success", message: "Receiver data added to order" });
});

/**
 * if order exists (with email, nameGifter, nameReceiver and textCode), it calls mongoose method 'setPrinted' that sets 'printed = true'
 */
router.patch("/:textCode", async (req, res) => {
  const order = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  await order.setPrinted();

  res.json({ status: "success", message: "Order change saved" });
});

/**
 * changes value prePrinted to true in db
 */

router.patch("/:orderNumber/prePrint", async (req, res) => {
  const order = await Uploads.findOne({
    _id: req.params.orderNumber,
  }).exec();

  await order.setPrePrinted();

  res.json({ status: "success", message: "Order change saved" });
});

/**
 * This post request will save the video reaction.
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

            const uploadRecord = await Uploads.findOne({
              textCode: req.params.textCode,
            }).exec();

            try {
              if (uploadRecord.answerVideo) {
                fs.unlinkSync(uploadPath + uploadRecord.answerVideo);
              }
            } catch (e) {}

            uploadRecord.answerVideo = finalFileName;

            await uploadRecord.save();

            return res.json(uploadRecord);
          })
          .save(uploadPath + finalFileName);
      }
    });
  } catch (e) {
    try {
      fs.unlinkSync(uploadPath + video.name);
    } catch (e) {}
    return res.json({
      status: "error",
      message:
        "Er is een fout opgetreden tijdens het uploaden van de video en de video is helaas niet geupload. Probeer het later opnieuw",
    });
  }
});

module.exports = router;
