require('dotenv').config();

const fileExtensionChecker = (value) =>
  process.env.ACCEPTEDVIDEOFORMATS.split(" ").some((element) =>
    value.includes(element)
  );

module.exports = fileExtensionChecker;
