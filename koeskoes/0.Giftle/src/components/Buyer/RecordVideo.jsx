import React, { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";
// import NextArrowIcon from "../Common/NextArrowIcon";
import { useSelector, useDispatch } from "react-redux";
import { setVideoUploaded } from "../../redux/actions/orderActions";
import Camera from '../Common/Camera';

/**
 *
 * React component to record video's from the webcam.
 *
 * @return the front-end for the recording page
 *
 */
function RecordVideo() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isGoBackBuyerMain, setIsGoBackBuyerMain] = useState(false);
  const [resolution, setResolution] = useState("720");
  const [progress, setProgress] = useState("0");
  const [barColor, setBarColor] = useState("bg-info");
  const [isDevicesChecked, setIsDevicesChecked] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [cameraPosition, setCameraPosition] = useState("user");
  const [availableCameras, setAvailableCameras] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(120);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const textCode = useSelector((state) => state.orders.textCode);
  const videoUploaded = useSelector((state) => state.orders.videoUploaded);

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (!textCode) {
    return <Navigate to="/noTextCode" />;
  }

  if (isGoBackBuyerMain === true) {
    return <Navigate to="/buyer" />;
  }

  if (isGoToWatchVideo === true) {
    if (textCode !== null) {
      dispatch(setVideoUploaded());
      return <Navigate to="/rewatchvideo" />;
    }
    return null;
  }

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <button
          className="btn btn-primary float-start justify-content-center"
          onClick={() => setIsGoBackBuyerMain(true)}
        >
          {<BackArrow />}
          Terug
        </button>
        <h1>Uw video opnemen</h1>
        <br />
        <Camera error={{error, setError}} uploadPath={`http://localhost:4000/orders/order/video/${textCode}`} />
        <p className="mt-3">
          Door een video op te nemen gaat u akkoord met de{" "}
          <a href="#algemene-voorwaarden">algemene voorwaarden</a>.
        </p>
        {videoUploaded ? (
          <button
            className="btn btn-primary me-3"
            onClick={() => setIsGoToWatchVideo(true)}
          >
            Gebruik vorige video
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default RecordVideo;
