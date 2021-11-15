import React, { useState } from "react";
import VideoConverter from "convert-video";
import axios from 'axios';

function UploadVideo() {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  const convertVideo = async () => {
    console.log(video);
    if (video === null) return setError(
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
          Kies een bestand!
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
      </div>
    );
    const sourceVideoFile = video.files[0];
    if (sourceVideoFile.type.split("/")[0] === 'video') {
      const formData = new FormData();
    
      const blob = new Blob([sourceVideoFile], {type: 'video/mp4'});

      formData.append(
        "video",
        blob,
        sourceVideoFile.name
      );
    
      const uploadResponse = await axios.post(`http://localhost:4000/fileUpload/`, formData);

      if (uploadResponse.status === 'error') {
        setError(
          <div class="alert alert-danger d-flex align-items-center" role="alert">
            <div>
              {uploadResponse.message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
          </div>
        );
      }
    }
    else {
      setError(
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <div>
            Kies een geldig video bestand!
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
        </div>
      );
    }
  };
  return (
    <div className="vertical-center colored-background">
      {error}
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
