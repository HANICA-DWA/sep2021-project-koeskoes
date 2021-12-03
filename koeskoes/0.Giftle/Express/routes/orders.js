const express = require("express");
const generateRandomFileName = require("../commonFunctions/generateRandomFileName");
const fileUpload = require("express-fileupload");
const router = express.Router();
const mongoose = require("mongoose");
const mailModule = require("../commonFunctions/sendMails");
const mail = new mailModule();
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
        prePrinted: 1,
      }
    )
    .exec();

  res.json(orders);
});

/**
 * creating new order in the db from checkoutpage
 */
router.post("/newOrder", async (req, res) => {
  try {
    const newRecord = new uploads({
      nameGifter: req.body.nameBuyer,
      emailGifter: req.body.emailBuyer,
      videoName: "",
      prePrinted: false,
      printed: false,
    });

    await newRecord.save();

    await newRecord.setCode();

    await mail.sendMailOrderPlaced(
      req.body.emailBuyer,
      req.body.nameBuyer,
      newRecord.textCode
    );

    return res.json(newRecord);
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", message: "Order not created!" });
  }
});

router.post("/new", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({ status: "error", message: "No file has been uploaded" });
  }

  const video = req.files.video;

  const { finalFileName, uploadPath } = generateRandomFileName(
    video.name,
    Date.now()
  );

  try {
    const uploadStatus = await video.mv(uploadPath);

    if (uploadStatus && uploadStatus.err)
      return res.json({ status: "error", message: "File not uploaded" });

    const newRecord = new uploads({
      nameGifter: "firstname lastname",
      emailGifter: "mail@mail.com",
      videoName: finalFileName,
      prePrinted: false,
      printed: false,
    });

    await newRecord.save();

    await newRecord.setCode();

    return res.json(newRecord);
  } catch (e) {
    return res.json({ status: "error", message: "File not uploaded" });
  }
});

router.patch("/new/:textCode/", async (req, res) => {
  if (req.body.name === "null" || req.body.name === "") {
    return res.json({ status: "error", message: "No name entered" });
  }

  const order = await uploads
    .findOne({
      textCode: req.params.textCode,
    })
    .exec();

  order.nameReceiver = req.body.name;

  if (req.body.email !== "null" && req.body.email !== "") {
    order.emailReceiver = req.body.email;
  }

  await order.save();

  res.json({ status: "success", message: "Receiver data added to order" });
});

router.patch("/:orderNumber", async (req, res) => {
  const order = await uploads
    .findOne({
      _id: req.params.orderNumber,
    })
    .exec();

  await order.setPrinted();

  res.json({ status: "success", message: "Order change saved" });
});

/**
 * Changes value prePrinted to true in db
 */

router.patch("/:orderNumber/prePrint", async (req, res) => {
  const order = await uploads
    .findOne({
      _id: req.params.orderNumber,
    })
    .exec();

  await order.setPrePrinted();

  res.json({ status: "success", message: "Order change saved" });
});

module.exports = router;
