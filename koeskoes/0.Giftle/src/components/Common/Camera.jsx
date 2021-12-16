import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import Webcam from "react-webcam";
import Spinner from "../Common/Spinner";
import { ReactComponent as RecButton } from "../../assets/rec-button.svg";
import { ReactComponent as PauseButton } from "../../assets/pause.svg";
import { setVideo } from "../../redux/actions/videoActions";

const Camera = (props) => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [resolution, setResolution] = useState("720");
  const [progress, setProgress] = useState("0");
  const [barColor, setBarColor] = useState("bg-info");
  const [isDevicesChecked, setIsDevicesChecked] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [cameraPosition, setCameraPosition] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(120);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const textCode = useSelector((state) => state.orders.textCode);

  /**
   *
   * UseEffect to check if audio and video is available for the webcam module.
   * If the webcam is available it will safe the available video devices in a state.
   * This state can be used for a dropdown menu to select which camera the user wants to use.
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
          if (props.setError)
            props.setError(
              ErrorMessage("Geen microfoon gevonden", () =>
                props.setError(null)
              )
            );
        }
      } catch (e) {
        setIsAudioAvailable(false);
        if (props.setError)
          props.setError(
            ErrorMessage("Geen microfoon gevonden", () => props.setError(null))
          );
      }

      try {
        const videoAccess = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoAccess.getVideoTracks().length > 0) {
          setIsWebcamAvailable(true);
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          setCameraPosition(videoDevices[0].deviceId);
          setAvailableCameras(videoDevices);
        } else {
          setIsWebcamAvailable(false);
          if (props.setError)
            props.setError(
              ErrorMessage("Geen webcam gevonden", () => props.setError(null))
            );
        }
      } catch (e) {
        setIsWebcamAvailable(false);
        if (props.setError)
          props.setError(
            ErrorMessage("Geen webcam gevonden", () => props.setError(null))
          );
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
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  /**
   *
   * Handles the video upload to the server.
   *
   * @return Error if there is a error
   * @return setIsGoToWatchVideo to true if no erro
   *
   */
  useEffect(() => {
    const handleUpload = async () => {
      if (recordedChunks.length > 0) {
        setUploading(true);
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });

        const formData = new FormData();

        formData.append("video", blob, "recordedVideo.webm");
        const uploadResponse = await axios.patch(props.uploadPath, formData);

        setRecordedChunks([]);

        if (uploadResponse.status === "error") {
          setUploading(false);
          return props.setError
            ? props.setError(
                ErrorMessage(uploadResponse.data.message, () =>
                  props.setError(null)
                )
              )
            : null;
        } else {
          if (props.setError) props.setError(null)
          return dispatch(setVideo(uploadResponse.data));
        }
      }
    };

    handleUpload();
  }, [recordedChunks, textCode, props, dispatch]);

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
   * UseEffect activates when resolution changes.
   * Changes the total recording time to a time in seconds.
   *
   * 720p = 120 seconds + 20 seconds
   * 1080p = 60 seconds + 20 seconds
   */
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

  /**
   * UseEffect activates when currentTime, totalTime, timer or handleStopCaptureClick changes.
   * Sets the progress of the recording progress bar.
   * When the currentTime is more than the total recording time it will stop recording.
   */
  useEffect(() => {
    setProgress(
      (prevProgress) =>
        (prevProgress =
          (totalTime - 20 > currentTime
            ? currentTime / (totalTime - 20)
            : currentTime / totalTime) * 100)
    );
    if (currentTime >= totalTime) {
      clearTimeout(timer);
      handleStopCaptureClick();
    }
  }, [currentTime, totalTime, timer, handleStopCaptureClick]);

  useEffect(() => {
    setMinutes(Math.floor(currentTime / 60));
    setSeconds(Math.floor(currentTime) - Math.floor(currentTime / 60) * 60);
  }, [currentTime]);

  /**
   * interval function activates after it being called out.
   * Sets a timeout every second.
   * Every second it adds 1 to the current recording time.
   * After the total recording time - 20 seconds the recording bar will changes to a red color.
   */
  const interval = useCallback(() => {
    setTimer((prevTimer) => {
      prevTimer = setTimeout(function () {
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
    setPressed((pressedState) => (pressedState = !pressedState));
    if (pressed) {
      if (currentTime === 0) {
        interval();
      }
    } else {
      setCurrentTime((prevTime) => (prevTime = 0));
      clearTimeout(timer);
    }
  };

  /**
   * This function handles the onClick event to start the recording process AND start the recording progress bar.
   */
  const startRecordAndBar = () => {
    handleStartCaptureClick();
    countdownRecording();
  };

  /**
   * This function handles to onClick event to stop the recording process AND stop the recording progress bar.
   */
  const stopRecordAndBar = () => {
    handleStopCaptureClick();
    countdownRecording();
  };

  return (
    <>
      <div className="row">
        <h1>Uw video opnemen</h1>
      </div>
      {!uploading ? (
        <>
          <div className="row mb-2">
            <div
              className={
                (availableCameras.length > 1 ? "col-md-8" : "col-md-12") +
                " " +
                "col-sm-6 col-12"
              }
            >
              <p className="text-start mb-1">Opnameduur en kwaliteit: </p>
              <select
                className="form-select"
                defaultValue="720"
                disabled={pressed}
                onChange={(e) =>
                  !pressed ? setResolution(e.target.value) : null
                }
              >
                <option key="720" value="720">Standaard kwaliteit / 2 minuten</option>
                <option key="1080" value="1080">Hoge kwaliteit / 1 minuut</option>
              </select>
            </div>
            {availableCameras.length > 1 ? (
              <div className="col-md-4 col-sm-6 col-12">
                <p className="text-start mb-1">Camera: </p>
                <select
                  className="form-select"
                  value={cameraPosition}
                  disabled={pressed}
                  onChange={(e) =>
                    !pressed ? setCameraPosition(e.target.value) : null
                  }
                >
                  {availableCameras.map((camera) => (
                    <option value={camera.deviceId}>{camera.label}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          <div style={{ width: "100%" }}>
            <Webcam
              audio={true}
              muted={true}
              ref={webcamRef}
              forceScreenshotSourceSize
              videoConstraints={{
                height: resolution,
                width: (resolution / 9) * 16,
                deviceId: cameraPosition,
              }}
              width={"100%"}
            />
            {isWebcamAvailable && isAudioAvailable ? (
              capturing ? (
                <button
                  className="btn btn-round btn-record recording-breathing"
                  onClick={stopRecordAndBar}
                >
                  <PauseButton />
                </button>
              ) : recordedChunks.length < 1 ? (
                <button
                  className="btn btn-primary btn-round btn-record"
                  onClick={startRecordAndBar}
                >
                  <RecButton />
                </button>
              ) : null
            ) : (
              <p>Er is geen toegang tot de camera of microfoon</p>
            )}
          </div>
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
          <div>
            {(minutes < 10 ? "0" + minutes : minutes) +
              ":" +
              (seconds < 10 ? "0" + seconds : seconds === 60 ? "00" : seconds)}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Camera;
