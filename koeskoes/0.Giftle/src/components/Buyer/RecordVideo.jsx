import React, { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router";
import Webcam from "react-webcam";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";

/**
 *
 * React component to record video's from the webcam.
 *
 * @return the front-end for the recording page
 *
 */
function RecordVideo() {
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
  const [textCode, setTextCode] = useState(null);
  const [cameraPosition, setCameraPosition] = useState(null);

  const [pressed, setPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(120);

  /**
   *
   * UseEffect to check if audio and video is available for the webcam module.
   *
   */
  useEffect(() => {
    const checkVideoAndAudio = async () => {
      try {
        const audioAccess = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        if (audioAccess.getAudioTracks().length > 0) {
          setIsAudioAvailable(true);
        } else {
          setIsAudioAvailable(false);
          setError(
            ErrorMessage("Geen microfoon gevonden", () => setError(null))
          );
        }
      } catch (e) {
        setIsAudioAvailable(false);
        setError(ErrorMessage("Geen microfoon gevonden", () => setError(null)));
      }

      try {
        const videoAccess = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoAccess.getVideoTracks().length > 0) {
          setIsWebcamAvailable(true);
        } else {
          setIsWebcamAvailable(false);
          setError(ErrorMessage("Geen webcam gevonden", () => setError(null)));
        }
      } catch (e) {
        setIsWebcamAvailable(false);
        setError(ErrorMessage("Geen webcam gevonden", () => setError(null)));
      }

      setIsDevicesChecked(true);
    };

    if (isDevicesChecked !== true) {
      checkVideoAndAudio();
    }
  });

  useEffect(() => {
    switch (resolution) {
      case "720":
        setTotalTime((prevTotal) => (prevTotal = 140));
        break;
      case "1080":
        setTotalTime((prevTotal) => (prevTotal = 80));
        break;
      default:
        return setTotalTime((prevTotal) => (prevTotal = 140));
    }
  }, [resolution]);

  const interval = useCallback(() => {
    setTimer((prevTimer) => {
      prevTimer = setTimeout(function () {
        console.log(Date.now());
        const tempTime = currentTime + 1;
        if (
          (tempTime >= 120 && totalTime === 140) ||
          (tempTime >= 60 && totalTime === 80)
        ) {
          setBarColor("bg-danger");
        } else {
          setBarColor("bg-info");
        }
        setCurrentTime((prevTime) => (prevTime = tempTime));
      }, 1000);
    });
  }, [currentTime, totalTime]);

  useEffect(() => {
    if (currentTime < totalTime && pressed) {
      interval();
    }
  }, [currentTime, interval, totalTime, pressed]);

  const countdownRecording = useCallback(() => {
    setPressed((pressedState) => (pressedState = !pressedState));
    if (pressed) {
      if (currentTime === 0) {
        interval();
      }
    } else {
      setCurrentTime((prevTime) => (prevTime = 0));
      clearTimeout(timer);
    }
  }, [currentTime, interval, pressed, timer]);

  /**
   *
   * Adds new data chunks to previously recorded chunks.
   *
   */
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  /**
   *
   * Handles the on click event to start recording.
   *
   */
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    countdownRecording();
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [
    webcamRef,
    setCapturing,
    mediaRecorderRef,
    handleDataAvailable,
    countdownRecording,
  ]);

  /**
   *
   * Handles the on click event to stop recording.
   *
   */
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    countdownRecording();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing, countdownRecording]);

  /**
   *
   * Handles the video upload to the server.
   *
   * @return Error if there is a error
   * @return setIsGoToWatchVideo to true if no erro
   *
   */
  const handleDownload = useCallback(async () => {
    if (recordedChunks.length) {
      if (recordedChunks[0].size > 10485760) {
        return setError(
          ErrorMessage("Maak een kortere video!", () => setError(null))
        );
      }

      if (recordedChunks[0].size < 512000) {
        return setError(
          ErrorMessage("Maak een langere video!", () => setError(null))
        );
      }

      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const formData = new FormData();

      formData.append("video", blob, "recordedVideo");

      const uploadResponse = await axios.post(
        `http://localhost:4000/orders/new/`,
        formData
      );

      setRecordedChunks([]);

      if (uploadResponse.status === "error") {
        return setError(
          ErrorMessage(uploadResponse.data.message, () => setError(null))
        );
      } else {
        setTextCode(uploadResponse.data.textCode);
        return setIsGoToWatchVideo(true);
      }
    }
  }, [recordedChunks]);

  /**
   *
   * Handles the reset event to start over.
   *
   */
  const handleResetRecording = () => {
    setRecordedChunks([]);
  };
  
  useEffect(() => {
    setProgress(
      (prevProgress) => (prevProgress = (currentTime / totalTime) * 100)
    );
    if (currentTime >= totalTime) {
      clearTimeout(timer);
      handleStopCaptureClick();
    }
  }, [currentTime, totalTime, timer, handleStopCaptureClick]);

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isGoBackBuyerMain === true) {
    return <Navigate to="/buyer" />;
  }

  if (isGoToWatchVideo === true) {
    if (textCode !== null) {
      return <Navigate to={`/rewatchvideo/` + textCode} />;
    }
    return null;
  }

  const startRecordAndBar = () => {
    handleStartCaptureClick();
    countdownRecording();
  };

  const stopRecordAndBar = () => {
    handleStopCaptureClick();
    countdownRecording();
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <button
          className="btn btn-primary float-start"
          onClick={() => setIsGoBackBuyerMain(true)}
        >
          {<BackArrow />}
          Terug
        </button>
        <h1>Uw video opnemen</h1>
        <br />
        <Webcam
          audio={true}
          ref={webcamRef}
          forceScreenshotSourceSize
          videoConstraints={{
            height: resolution,
            width: (resolution / 9) * 16,
          }}
          width={"100%"}
        />
        <div className="progress">
          <div
            className={`progress-bar ` + barColor}
            role="progressbar"
            style={{ width: progress + "%" }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <p className="text-start">Opnameduur en kwaliteit: </p>
            <select
              className="form-select"
              defaultValue="720"
              onChange={(e) => setResolution(e.target.value)}
            >
              <option value="720">Standaard kwaliteit / 2 minuten</option>
              <option value="1080">Hoge kwaliteit / 1 minuut</option>
            </select>
          </div>
          <div className="col-md-4 col-sm-12">
            <p className="text-start">Camerapositie: </p>
            <button className="btn btn-primary lg-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </button>
            <select
              className="form-select md-sm-hidden"
              defaultValue="kiezen"
              onChange={(e) => setCameraPosition(e.target.value)}
            >
              <option value="kiezen" disabled>
                Kies een camera positie
              </option>
              <option value="first_cam">Eerste camera</option>
              <option value="second_cam">Tweede camera</option>
            </select>
          </div>
        </div>
        <p className="mt-5">
          Door een video op te nemen gaat u akkoord met de{" "}
          <a href="#algemene-voorwaarden">algemene voorwaarden</a>.
        </p>
        {isWebcamAvailable && isAudioAvailable ? (
          capturing ? (
            <button className="btn btn-primary me-3" onClick={stopRecordAndBar}>
              Opnemen stoppen
            </button>
          ) : recordedChunks.length > 0 ? (
            <>
              <button
                className="btn btn-primary me-3"
                onClick={handleResetRecording}
              >
                Opnieuw opnemen
              </button>
              <button className="btn btn-primary me-3" onClick={handleDownload}>
                Volgende stap
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary me-3"
              onClick={startRecordAndBar}
            >
              Opnemen starten
            </button>
          )
        ) : (
          <p>Er is geen toegang tot de camera of microfoon</p>
        )}
      </div>
    </div>
  );
}

export default RecordVideo;
