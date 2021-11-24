const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  nameGifter: {
    type: String,
    required: true,
  },
  emailGifter: {
    type: String,
    required: true,
  },
  nameReceiver: {
    type: String,
  },
  emailReceiver: {
    type: String,
  },
  videoName: {
    type: String,
    unique: true,
  },
  textCode: {
    type: String,
    unique: true,
  },
  printed: {
    type: Boolean,
    required: true,
  },
});

/**
 *
 * Don't change this function to an arrow function. Thank you <3
 *
 */
uploadSchema.methods.setCode = async function (randomCode) {
  this.printed = true;
  this.textCode = randomCode;

  return await this.save();
};

mongoose.model("UploadSchema", uploadSchema);
