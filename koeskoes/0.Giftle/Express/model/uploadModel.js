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
uploadSchema.methods.setCode = async function () {
  // Because this function uses the database it has to be required INSIDE the method.
  const generateUniqueRandomCode = require("../commonFunctions/generateUniqueRandomCode");

  const randomCode = await generateUniqueRandomCode();

  this.textCode = randomCode;

  return await this.save();
};

uploadSchema.methods.setPrinted = async function () {
  this.printed = true;

  return await this.save();
};

// uploadSchema.methods.convertArrayObjectIdToString = function () {
//   this.forEach(order => {
//     order._id = this._id.toString();
//   });

//   return this;
// }

mongoose.model("UploadSchema", uploadSchema);
