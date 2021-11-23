import React, { useState, useEffect, useRef, useCallback } from "react";
import { Navigate } from "react-router";
import Webcam from "react-webcam";
import axios from "axios";
import ErrorMessage from '../Common/CreateErrorMessage';
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
  const [resolution, setResolution] = useState('720');
  const [isDevicesChecked, setIsDevicesChecked] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  /**
   *
   * UseEffect to check if audio and video is available for the webcam module.
   *
   */
  useEffect(() => {
    const checkVideoAndAudio = async () => {
      try {
        const audioAccess = await navigator.mediaDevices.getUserMedia({audio: true});

        if (audioAccess.getAudioTracks().length > 0){
          setIsAudioAvailable(true);
        } else {
          setIsAudioAvailable(false);
          setError(ErrorMessage('Geen microfoon gevonden', () => setError(null)));
        }
      }
      catch (e) {
        setIsAudioAvailable(false);
        setError(ErrorMessage('Geen microfoon gevonden', () => setError(null)));
      }

      try {
        const videoAccess = await navigator.mediaDevices.getUserMedia({video: true});

        if (videoAccess.getVideoTracks().length > 0){
          setIsWebcamAvailable(true);
        } else {
          setIsWebcamAvailable(false);
          setError(ErrorMessage('Geen webcam gevonden', () => setError(null)));
        }
      }
      catch (e) {
        setIsWebcamAvailable(false);
        setError(ErrorMessage('Geen webcam gevonden', () => setError(null)));
      }

      
      setIsDevicesChecked(true);
    }

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
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

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
        type: "video/webm"
      });
      
      const formData = new FormData();

      formData.append("video", blob, 'recordedVideo');

      const uploadResponse = await axios.post(
        `http://localhost:4000/orders/`,
        formData
      );

      setRecordedChunks([]);

      if (uploadResponse.status === "error") {
        return setError(ErrorMessage(uploadResponse.message, () => setError(null)));
      }
      else {
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
  }

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isGoBackBuyerMain === true) {
    return <Navigate to="/buyer" />;
  }
  
  if (isGoToWatchVideo === true) {
    return <Navigate to="/rewatchvideo" />;
  }

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <button
          className="btn btn-primary float-start"
          onClick={() => setIsGoBackBuyerMain(true)}
        >
          {<BackArrow/>}
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
            width: (resolution / 9 * 16)
          }}
          width={"100%"}
        />
        <p>Resolutie: </p>
        <select class="form-select" onChange={(e) => setResolution(e.target.value)}>
          <option value="480">480p</option>
          <option selected value="720">720p</option>
          <option value="1080">1080p</option>
        </select>
        <p>
          Door een video op te nemen gaat u akkoord met de{" "}
          <a href="#algemene-voorwaarden">algemene voorwaarden</a>.
        </p>
        <br />
        {(isWebcamAvailable && isAudioAvailable ? capturing ? (
          <button className="btn btn-primary me-3" onClick={handleStopCaptureClick}>Opnemen stoppen</button>
        ) : ( recordedChunks.length > 0 ? (
            <>
              <button className="btn btn-primary me-3" onClick={handleResetRecording}>Opnieuw opnemen</button>
              <button className="btn btn-primary me-3" onClick={handleDownload}>Volgende stap</button>
            </>
          ) : (
            <button className="btn btn-primary me-3" onClick={handleStartCaptureClick}>Opnemen starten</button>
          )
        ) : <p>Er is geen toegang tot de camera of microfoon</p>)}
      </div>
    </div>
  );
}

export default RecordVideo;
