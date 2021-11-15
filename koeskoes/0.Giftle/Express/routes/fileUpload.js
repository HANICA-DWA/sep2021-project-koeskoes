const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

// default options
router.use(fileUpload());

router.post('/', function(req, res) {
  let video;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.send({status: 'error', message: 'No file has been uploaded'});
  }

  video = req.files.video;
  uploadPath = '../src/videos/' + video.name.split('.')[0] + '.mp4';

  video.mv(uploadPath, function(err) {
    if (err)
      return res.send({status: 'error', message: 'File not uploaded'});

    return res.send({status: 'success', message: 'File uploaded'});
  });
});

module.exports = router;