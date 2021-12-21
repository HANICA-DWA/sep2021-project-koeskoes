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

module.exports = router;
