import React, { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router";
import Webcam from "react-webcam";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";
import { useSelector, useDispatch } from "react-redux";
import { setVideoUploaded } from "../../redux/actions/orderActions";

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
  const textCode = useSelector((state) => state.orders.textCode);
  const videoUploaded = useSelector((state) => state.orders.videoUploaded);

  

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
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          setAvailableCameras(videoDevices);
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
    // countdownRecording();
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
  ]);

  /**
   *
   * Handles the on click event to stop recording.
   *
   */
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

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

  /**
   * UseEffect activates when resolution changes.
   * Changes the total recording time to a time in seconds.
   * 
   * 720p = 120 seconds + 20 seconds
   * 1080p = 60 seconds + 20 seconds
   */
  useEffect(() => {
    switch(resolution) {
      case "720":
        setTotalTime(prevTotal => prevTotal = 140);
        break;
      case "1080":
        setTotalTime(prevTotal => prevTotal = 80);
        break;
      default:
        return setTotalTime(prevTotal => prevTotal = 140);
    }
  }, [resolution]);

  /**
   * UseEffect activates when currentTime, totalTime, timer or handleStopCaptureClick changes.
   * Sets the progress of the recording progress bar.
   * When the currentTime is more than the total recording time it will stop recording.
   */
  useEffect(() => {
    setProgress(prevProgress => prevProgress = (currentTime / totalTime) * 100);
    if (currentTime >= totalTime) {
      clearTimeout(timer);
      handleStopCaptureClick();
    }
  }, [currentTime, totalTime, timer, handleStopCaptureClick]);

  /**
   * interval function activates after it being called out.
   * Sets a timeout every second.
   * Every second it adds 1 to the current recording time.
   * After the total recording time - 20 seconds the recording bar will changes to a red color.
   */
  const interval = useCallback(() => {
    setTimer(prevTimer => {
      prevTimer = setTimeout(function () {
        const tempTime = currentTime + 1;
        if (
          (tempTime >= 120 && totalTime === 140) ||
          (tempTime >= 60 && totalTime === 80)
        ) {
          setBarColor("bg-danger");
        }
        else {
          setBarColor("bg-info");
        }
        setCurrentTime(prevTime => prevTime = tempTime);
      }, 1000)
    });
  }, [currentTime, totalTime]);

  /**
   * Calls the interval function is the state pressed is true and if the current recording time is less than the total recording time.
   */
  useEffect(() => {
    if (currentTime < totalTime && pressed) {
      interval();
    }
  }, [currentTime, interval, totalTime, pressed]);

  /**
   * Gets called by the start and stop recording buttons.
   * If the state pressed is true it will start moving the recording progress bar.
   * If the state pressed is false it will stop the recording progress bar from moving.
   */
  const countdownRecording = () => {
    setPressed(pressedState => pressedState = !pressedState);
    if (pressed) {
      if (currentTime === 0) {
        interval();
      }
    }
    else {
      setCurrentTime(prevTime => prevTime = 0);
      clearTimeout(timer);
    }
  };

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
            deviceId: cameraPosition,
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
              value={cameraPosition}
              onChange={(e) => setCameraPosition(e.target.value)}
            >
              {availableCameras.map(camera => <option value={camera.deviceId}>{camera.label}</option>)}
              {/* <option value="first_cam">Eerste camera</option>
              <option value="second_cam">Tweede camera</option> */}
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
        
        {(videoUploaded
          ? <button className="btn btn-primary mx-3" onClick={() => setIsGoToWatchVideo(true)}>
              Gebruik vorige video
            </button>
          : null
        )}
      </div>
    </div>
  );
}

export default RecordVideo;
