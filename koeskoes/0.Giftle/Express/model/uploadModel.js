const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  nameGifter: {
    type: String,
    required: true
  },
  emailGifter: {
    type: String,
    required: true
  },
  nameReceiver: {
    type: String
  },
  emailReceiver: {
    type: String
  },
  videoName: {
    type: String
  },
  textCode: {
    type: Number
  },
  printed: {
    type: Boolean,
    required: true
  }
});

const uploads = mongoose.model('UploadSchema', uploadSchema);