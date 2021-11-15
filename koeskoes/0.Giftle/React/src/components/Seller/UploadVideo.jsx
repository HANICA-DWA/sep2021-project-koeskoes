import React, { useState } from "react";
import VideoConverter from "convert-video";

function UploadVideo() {
  const [video, setVideo] = useState(null);

  const convertVideo = async () => {
    let sourceVideoFile = video.files[0];
    let targetVideoFormat = "mp4";
    let convertedVideoDataObj = await VideoConverter.convert(
      sourceVideoFile,
      targetVideoFormat
    );

    let a = document.createElement("a");
    a.href = convertedVideoDataObj.data;
    a.download =
      convertedVideoDataObj.name + "." + convertedVideoDataObj.format;
    a.click();
  };
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Video uploaden!</h1>
        <p>
          Voor het uploaden van een video moet je hieronder een video selecteren
          die je wilt meesturen met je cadeau.
        </p>
        <input
          type="file"
          name="uploadedVideo"
          accept="video/*"
          onChange={(e) => setVideo(e.target)}
        />
        <br />
        <br />
        <button className="btn btn-primary" onClick={convertVideo}>
          Upload video
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
