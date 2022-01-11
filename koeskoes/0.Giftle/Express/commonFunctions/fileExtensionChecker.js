require("dotenv").config();

const fileExtensionChecker = (value) => {
  const audioFormats =
    process.env.ACCEPTEDVIDEOFORMATS || "3gp f4v mkv mov mp4 ogg ogv webm m4v";
  const availableFormats = audioFormats.split(" ").some((element) => value.includes(element));
  return availableFormats;
};

module.exports = fileExtensionChecker;
