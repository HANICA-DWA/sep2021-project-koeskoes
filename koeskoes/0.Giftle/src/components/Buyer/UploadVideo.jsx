import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";
import { useSelector } from "react-redux";

function UploadVideo() {
  // Creates the state for uploaded files and errors that can occur.
  const [video, setVideo] = useState(null);
  const [isGoBackBuyerMain, setIsGoBackBuyerMain] = useState(false);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(false);
  const [error, setError] = useState(null);
  const textCode = useSelector((state) => state.orders.textCode);

  if (!textCode) {
    return <Navigate to="/noTextCode" />;
  }

  if (isGoBackBuyerMain === true) {
    return <Navigate to="/buyer" />;
  }

  if (isGoToWatchVideo === true) {
    if (textCode !== null) {
      return <Navigate to="/rewatchvideo" />;
    }
    return null;
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

    if (sourceVideoFile.type.split("/")[0] === "video") {
      const formData = new FormData();

      formData.append("video", sourceVideoFile, sourceVideoFile.name);

      const uploadResponse = await axios.patch(
        `http://localhost:4000/orders/order/video/${textCode}`,
        formData
      );

      if (uploadResponse.data.status === "error") {
        return setError(
          ErrorMessage(uploadResponse.data.message, () => setError(null))
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
          className="form-control mx-auto"
          onChange={(e) => setVideo(e.target)}
        />
        <br />
        <br />
        <button
          className="btn btn-primary mx-3"
          onClick={() => setIsGoBackBuyerMain(true)}
        >
          {<BackArrow />}
          Terug
        </button>
        <button className="btn btn-primary mx-3" onClick={convertVideo}>
          Upload video
        </button>
      </div>
    </div>
  );
}

export default UploadVideo;
