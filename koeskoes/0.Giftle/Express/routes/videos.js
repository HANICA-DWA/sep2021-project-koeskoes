const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

router.route("/:textCode").get(async (req, res) => {
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

module.exports = router;
