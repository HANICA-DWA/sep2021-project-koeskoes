const mongoose = require("mongoose");
require("./model/uploadModel");

const db = mongoose.connection;

const uploads = mongoose.model("UploadSchema");

mongoose
  .connect(`mongodb://localhost:27017/giftle`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    return seedE2ETests();
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    db.close();
  });

async function seedE2ETests() {
  await uploads.deleteMany();

  await uploads.insertMany([
    {
      nameGifter: "Sjoerd de Bruin",
      emailGifter: "sjoerddebruin1@hotmail.com",
      videoName: "2021-11-03 14-12-021639571824171.mp4",
      prePrinted: false,
      printed: false,
      textCode: "abc123",
      emailReceiver: "sjoerddebruin1@hotmail.com",
      nameReceiver: "Sjoerd de Bruin",
    },
    {
      nameGifter: "Sjoerd de Bruin",
      emailGifter: "sjoerddebruin1@hotmail.com",
      videoName: "recordedVideo1639569183512.mp4",
      prePrinted: false,
      printed: false,
      textCode: "def456",
      emailReceiver: "sjoerddebruin1@hotmail.com",
      nameReceiver: "Sjoerd de Bruin",
    },
    {
      nameGifter: "Sjoerd de Bruin",
      emailGifter: "sjoerddebruin1@hotmail.com",
      videoName: "recordedVideo1639575261321.mp4",
      prePrinted: false,
      printed: false,
      textCode: "ghi789",
      emailReceiver: "sjoerddebruin1@hotmail.com",
      nameReceiver: "Sjoerd de Bruin",
    },
  ]);
}
