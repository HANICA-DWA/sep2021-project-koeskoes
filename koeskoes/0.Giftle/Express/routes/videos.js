const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path');
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

router.get("/:textCode", async (req, res) => {
  const video = await uploads
    .findOne({
      textCode: req.params.textCode,
    })
    .exec();

  if (video !== null) {
    res.json(video);
  } else {
    res.json({ status: "error", message: "No textcode found" });
  }
});

router.get('/watch/:videoName', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'videos/', req.params.videoName));
});

module.exports = router;
