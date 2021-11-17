import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";

function UploadVideo() {
  // Creates the state for uploaded files and errors that can occur.
  const [video, setVideo] = useState(null);
  const [isGoBackSellerMain, setIsGoBackSellerMain] = useState(false);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(false);
  const [error, setError] = useState(null);

  if (isGoBackSellerMain === true) {
    return <Navigate to="/seller" />;
  }

  if (isGoToWatchVideo === true) {
    return <Navigate to="/watchVideo" />;
  }

  /**
   * This function will send the uploaded video file to the server.
   * If this file is not a video format it will generate an error.
   *
   * @author Sjoerd de Bruin
   *
   */
  const convertVideo = async () => {
    if (video === null){
      return setError(ErrorMessage('Kies een bestand!', () => setError(null)));
    }
    const sourceVideoFile = video.files[0];

    if (sourceVideoFile.size > 10485760) {
      return setError(ErrorMessage('Kies een kleiner bestand!', () => setError(null)));
    }

    if (sourceVideoFile.type.split("/")[0] === "video") {
      const formData = new FormData();

      const blob = new Blob([sourceVideoFile], { type: "video/mp4" });

      formData.append("video", blob, sourceVideoFile.name);

      const uploadResponse = await axios.post(
        `http://localhost:4000/orders/`,
        formData
      );

      if (uploadResponse.status === "error") {
        return setError(ErrorMessage(uploadResponse.message, () => setError(null)));
      }
      else {
        return setIsGoToWatchVideo(true);
      }
    } else {
      return setError(ErrorMessage('Kies een geldig video bestand!', () => setError(null)));
    }
  };
  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <button className="btn btn-primary float-start" onClick={() => setIsGoBackSellerMain(true)}>Terug</button>
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
