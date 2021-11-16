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
  emailReceiver: {
    type: String,
    required: true
  },
  mobileReceiver: {
    type: Number,
    required: true
  },
  vidName: {
    type: String,
    required: true
  },
  vidLocation: {
    type: String,
    required: true
  },
  textCode: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('UploadSchema', uploadSchema);