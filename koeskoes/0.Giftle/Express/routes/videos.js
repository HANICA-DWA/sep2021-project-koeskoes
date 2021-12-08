const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");
require("../model/uploadModel");

const Uploads = mongoose.model("UploadSchema");

/**
 * if textCode exists, it will fetch data from that textCode record
 */
router.get("/:textCode", async (req, res) => {
  const video = await Uploads.findOne({
    textCode: req.params.textCode,
  }).exec();

  if (video !== null) {
    res.json(video);
  } else {
    res.json({ status: "error", message: "No textcode found" });
  }
});

/**
 * if videoName exists, it will fetch data from that videoName record
 */
router.get("/video/:videoName", async (req, res) => {
  const video = await Uploads.findOne({
    videoName: req.params.videoName,
  }).exec();

  if (video !== null) {
    res.sendFile(path.join(__dirname, "../", "videos/", video.videoName));
  } else {
    res.json({ status: "error", message: "No textcode found" });
  }
});

module.exports = router;
