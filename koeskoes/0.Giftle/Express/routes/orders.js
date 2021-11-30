const express = require("express");
const generateRandomFileName = require("../commonFunctions/generateRandomFileName");
const fileUpload = require("express-fileupload");
const router = express.Router();
const mongoose = require("mongoose");
require("../model/uploadModel");

const uploads = mongoose.model("UploadSchema");

router.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10485760,
    },
  })
);

router.get("/all/", async (req, res) => {
  const orders = await uploads
    .find(
      {
        videoName: { $ne: "" },
        printed: false,
      },
      {
        _id: 1,
        nameGifter: 1,
        emailGifter: 1,
        nameReceiver: 1,
        emailReceiver: 1,
        videoName: 1,
        textCode: 1,
        printed: 1,
      }
    )
    .exec();

  res.json(orders);
});

router.post("/new/", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({ status: "error", message: "No file has been uploaded" });
  }

  const video = req.files.video;

  const {finalFileName, uploadPath} = generateRandomFileName(video.name, Date.now());

  try {
    const uploadStatus = await video.mv(uploadPath);
  
    if (uploadStatus && uploadStatus.err)
      return res.json({ status: "error", message: "File not uploaded" });
  
    const newRecord = new uploads({
      nameGifter: "firstname lastname",
      emailGifter: "mail@mail.com",
      nameReceiver: req.body.name,
      emailReceiver: req.body.email,
      videoName: finalFileName,
      printed: false,
    });
  
    await newRecord.save();
  
    return res.json({ status: "success", message: "File uploaded" });
  }
  catch (e) {
    return res.json({ status: "error", message: "File not uploaded" });
  }
  
});

router.patch("/:orderNumber/", async (req, res) => {
  const order = await uploads
    .findOne(
      {
        _id: req.params.orderNumber,
      }
    )
    .exec();
    
  await order.setCode();

  res.json({ status: "success", message: "Order change saved" });
});

module.exports = router;
