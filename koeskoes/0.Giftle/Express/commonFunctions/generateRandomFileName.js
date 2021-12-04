/**
 * 
 * @param {string} originalFileName 
 * @param {string} random 
 * @returns 
 */
const generateRandomFileName = (originalFileName, random) => {
  const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
  const finalFileName = fileNameWithoutExtension + random + ".mp4";
  const uploadPath = "videos/";

  return { finalFileName, uploadPath };
};

module.exports = generateRandomFileName;
