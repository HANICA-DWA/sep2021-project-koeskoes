const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/uploadModel');

const uploads = mongoose.model('UploadSchema');

// default options
router.use(fileUpload());

router.post('/', (req, res) => {
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