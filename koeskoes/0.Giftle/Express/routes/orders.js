const express = require('express');
const generateRandomCode = require('../commonFunctions/generateTextcode');
const fileUpload = require('express-fileupload');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/uploadModel');

const uploads = mongoose.model('UploadSchema');

router.use(fileUpload());

router.route('/')
.get(async (req, res) => {
  const orders = await uploads.find({
    videoName: {$ne: ''},
    printed: false
  }, 
  {
    _id: 1, nameGifter: 1, emailGifter: 1, nameReceiver: 1, emailReceiver: 1, videoName: 1, textCode: 1, printed: 1,
  }).exec();

  res.json(orders);
})
.post((req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({status: 'error', message: 'No file has been uploaded'});
  }

  const video = req.files.video;

  const fileNameWithoutExtension = video.name.replace(/\.[^/.]+$/, "")
  const finalFileName = fileNameWithoutExtension + Date.now() + '.mp4';
  const uploadPath = '../src/videos/' + finalFileName;

  video.mv(uploadPath, async (err) => {
    if (err)
      return res.send({status: 'error', message: 'File not uploaded'});

    const newRecord = new uploads({
      "nameGifter": 'firstname lastname',
      "emailGifter":'mail@mail.com',
      "nameReceiver": req.body.name,
      "emailReceiver": req.body.email,
      "videoName": finalFileName,
      "printed": false
    });

    await newRecord.save();

    return res.send({status: 'success', message: 'File uploaded'});
  });
})
.patch(async (req,res) => {
  const randomCode = await generateRandomCode();

  const order = await uploads.findOne({
    _id: req.body.orderNumber
  }, {
    _id: 1, emailGifter: 1, firstnameReceiver: 1, lastnameReceiver: 1, emailReceiver: 1, mobileReceiver: 1, videoName: 1, videoLocation: 1, textCode: 1,
  }).exec();

  order.printed = true;
  order.textCode = randomCode;

  await order.save();

  res.json({status:'success', message:'Order change saved'});
});

module.exports = router;