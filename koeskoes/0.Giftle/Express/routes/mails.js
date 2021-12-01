const express = require("express");
const router = express.Router();
const mailModule = require("../commonFunctions/sendMails");
const mail = new mailModule();
const mongoose = require("mongoose");
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

/**
 * This post request will send a mail to the receiver of a specific order.
 */
router.post("/:textCode", async (req, res) => {
  const order = await uploads
    .findOne({
      textCode: req.params.textCode,
    })
    .exec();

  console.log(order);

  const mailInfo = await mail.sendTextCode(
    order.emailReceiver,
    order.nameReceiver,
    order.nameGifter,
    order.textCode
  );

  res.json(mailInfo);
});

/**
 * This post request will send a mail to the buyer of a specific order when the video has been watched.
 */
router.post("/notification/video/:textCode/watched", async (req, res) => {
  const order = await uploads
    .findOne({
      textCode: req.params.textCode,
    })
    .exec();

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
  const order = await uploads
    .findOne({
      textCode: req.params.textCode,
    })
    .exec();

  const mailInfo = await mail.sendReminderUploadVideo(
    order.emailGifter,
    order.nameGifter
  );

  res.send(mailInfo);
});

module.exports = router;
