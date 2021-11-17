const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/uploadModel');

const uploads = mongoose.model('UploadSchema');

// default options
router.use(fileUpload());

router.route('/')
.get(async (req, res) => {
  const orders = await uploads.find({}, {
    _id: 1, emailGifter: 1, firstnameReceiver: 1, lastnameReceiver: 1, emailReceiver: 1, mobileReceiver: 1, videoName: 1, videoLocation: 1, textCode: 1,
  }).exec();

  console.log(orders)

  res.json(orders);
})
.post((req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({status: 'error', message: 'No file has been uploaded'});
  }

  const video = req.files.video;
  const splitFileName = video.name.split('.');
  splitFileName.pop();
  const fileNameWithoutExtension = splitFileName.join('.');
  const finalFileName = fileNameWithoutExtension + Date.now() + '.mp4';
  const uploadPath = '../src/videos/' + finalFileName;

  video.mv(uploadPath, async (err) => {
    if (err)
      return res.send({status: 'error', message: 'File not uploaded'});

    const newRecord = new uploads({
      "emailGifter":'mail@mail.com' ,
      "firstnameReceiver": 'firstname',
      "lastnameReceiver": 'lastname',
      "emailReceiver": 'mail@mail.com',
      "mobileReceiver": 1,
      "videoName": finalFileName,
      "videoLocation": finalFileName,
      "textCode": 929
    });

    await newRecord.save();

    return res.send({status: 'success', message: 'File uploaded'});
  });
});

module.exports = router;