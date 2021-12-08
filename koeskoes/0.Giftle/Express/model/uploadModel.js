const mongoose = require("mongoose");

/**
 * This schema is used to store all orders that want to send a Giftle videomessage.
 */
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
    default: undefined,
    unique: true,
    sparse: true,
  },
  textCode: {
    type: String,
    unique: true,
  },
  prePrinted: {
    type: Boolean,
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
  const Uploads = mongoose.model("UploadSchema", uploadSchema);

  const generateUniqueRandomCode = async () => {
    while (true) {
      const createRandomCode = () =>
        (Math.random() + 1).toString(36).substr(2, 6);

      const generatedRandomCode = createRandomCode();
      
      const randomCode = await Uploads
      .findOne(
        {
          textCode: generatedRandomCode,
        },
        {
          textCode: 1,
        }
      )
      .exec();

      if (randomCode === null) {
        return generatedRandomCode;
      }
    }
  };

  const randomCode = await generateUniqueRandomCode();

  this.textCode = randomCode;

  return await this.save();
};

uploadSchema.methods.setPrinted = async function () {
  this.printed = true;

  return await this.save();
};

uploadSchema.methods.setPrePrinted = async function () {
  this.prePrinted = true;

  return await this.save();
};

// uploadSchema.methods.convertArrayObjectIdToString = function () {
//   this.forEach(order => {
//     order._id = this._id.toString();
//   });

//   return this;
// }

mongoose.model("UploadSchema", uploadSchema);