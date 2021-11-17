const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
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
  },
  printed: {
    type: Boolean,
    required: true
  }
});

const uploads = mongoose.model('UploadSchema', uploadSchema);