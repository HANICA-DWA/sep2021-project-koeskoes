const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  emailGifter: {
    type: String,
    required: true
  },
  firstnameReceiver: {
    type: String,
    required: true
  },
  lastnameReceiver: {
    type: String,
    required: true
  },
  emailReceiver: {
    type: String,
    required: true
  },
  mobileReceiver: {
    type: Number,
    required: true
  },
  videoName: {
    type: String,
    required: true
  },
  videoLocation: {
    type: String,
    required: true
  },
  textCode: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('UploadSchema', uploadSchema);