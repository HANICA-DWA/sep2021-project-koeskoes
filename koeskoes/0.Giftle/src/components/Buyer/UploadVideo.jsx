import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";

function UploadVideo() {
  // Creates the state for uploaded files and errors that can occur.
  const [video, setVideo] = useState(null);
  const [nameReceiver, setNameReceiver] = useState(null);
  const [emailReceiver, setEmailReceiver] = useState(null);
  const [isGoBackBuyerMain, setIsGoBackBuyerMain] = useState(false);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(false);
  const [error, setError] = useState(null);

  if (isGoBackBuyerMain === true) {
    return <Navigate to="/buyer" />;
  }

  if (isGoToWatchVideo === true) {
    return <Navigate to="/watchVideo" />;
  }

  /**
   *
   * This function will send the uploaded video file to the server.
   * If this file is not a video format it will generate an error.
   *
   */
  const convertVideo = async () => {
    if (video === null) {
      return setError(ErrorMessage("Kies een bestand!", () => setError(null)));
    }
    const sourceVideoFile = video.files[0];

    if (sourceVideoFile.size > 10485760) {
      return setError(
        ErrorMessage("Kies een kleiner bestand!", () => setError(null))
      );
    }

    if (sourceVideoFile.size < 512000) {
      return setError(
        ErrorMessage("Kies een groter bestand!", () => setError(null))
      );
    }

    if (sourceVideoFile.type.split("/")[0] === "video") {
      const formData = new FormData();

      const blob = new Blob([sourceVideoFile], { type: "video/mp4" });

      formData.append("video", blob, sourceVideoFile.name);

      formData.append("name", nameReceiver);
      formData.append("email", emailReceiver);

      const uploadResponse = await axios.post(
        `http://localhost:4000/orders/`,
        formData
      );

      if (uploadResponse.status === "error") {
        return setError(
          ErrorMessage(uploadResponse.message, () => setError(null))
        );
      } else {
        return setIsGoToWatchVideo(true);
      }
    } else {
      return setError(
        ErrorMessage("Kies een geldig video bestand!", () => setError(null))
      );
    }
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <button
              className="btn btn-primary float-start"
              onClick={() => setIsGoBackBuyerMain(true)}
            >
              {<BackArrow />}
              Terug
            </button>
          </div>
        </div>
        <div className="row">
          <h1>Video uploaden!</h1>
        </div>
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
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-lg-8 col-md-8 col-sm-8">
            <br />
            <label for="emailReceiver" class="form-label">
              Naam van de ontvanger
            </label>
            <input
              type="email"
              class="form-control"
              id="nameReceiver"
              name="nameReceiver"
              onChange={(e) => setNameReceiver(e.target.value)}
            />
            <br />
            <label for="emailReceiver" class="form-label">
              E-mailadres van de ontvanger
            </label>
            <input
              type="email"
              class="form-control"
              id="emailReceiver"
              name="emailReceiver"
              onChange={(e) => setEmailReceiver(e.target.value)}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
        </div>
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
