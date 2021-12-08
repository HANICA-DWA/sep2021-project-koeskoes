/**
 * 
 * Function that generates a random video filename 
 * 
 * @param {string} originalFileName the orginal filename from the database
 * @param {string} random random string
 * @returns the final filename and the upload path
 */
const generateRandomFileName = (originalFileName, random) => {
  const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
  const finalFileName = fileNameWithoutExtension + random + ".mp4";
  const uploadPath = "videos/";

  return { finalFileName, uploadPath };
};

module.exports = generateRandomFileName;
