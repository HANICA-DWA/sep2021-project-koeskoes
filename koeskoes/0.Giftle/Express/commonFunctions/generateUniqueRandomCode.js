const mongoose = require("mongoose");
require("../model/uploadModel");

const Uploads = mongoose.model("UploadSchema");

/**
 *
 * This function will generate a random code, if the code exists in the database it will generate another one until it found one that hasn't been used yet.
 *
 * @returns randomCode
 *
 */
const generateUniqueRandomCode = async () => {
  while (true) {
    const createRandomCode = () =>
      (Math.random() + 1).toString(36).substr(2, 6);

    const randomCode = await Uploads
      .findOne(
        {
          textCode: createRandomCode(),
        },
        {
          textCode: 1,
        }
      )
      .exec();

    if (randomCode === null) {
      return createRandomCode();
    }
  }
};

module.exports = generateUniqueRandomCode;
