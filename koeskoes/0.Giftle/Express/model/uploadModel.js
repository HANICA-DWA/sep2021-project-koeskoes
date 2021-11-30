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
 * The generateUniqueRandomCode require has to be BELOW the assignement of
 * the UploadSchema. This way it won't crash.
 *
 */
mongoose.model("UploadSchema", uploadSchema);

const generateUniqueRandomCode = require("../commonFunctions/generateUniqueRandomCode");

/**
 *
 * Don't change this function to an arrow function. Thank you <3
 *
 */
uploadSchema.methods.setCode = async function () {
  const randomCode = await generateUniqueRandomCode();

  this.printed = true;
  this.textCode = randomCode;

  return await this.save();
};
