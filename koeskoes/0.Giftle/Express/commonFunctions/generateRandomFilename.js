const generateRandomFileName = (originalFileName, random) => {
  const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
  const finalFileName = fileNameWithoutExtension + random + ".mp4";
  const uploadPath = "../src/videos/" + finalFileName;

  return {finalFileName, uploadPath};
}

module.exports = generateRandomFileName;