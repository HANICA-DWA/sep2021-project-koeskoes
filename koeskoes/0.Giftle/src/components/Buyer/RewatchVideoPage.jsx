import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { Navigate } from "react-router";
import BackArrow from "../Common/BackArrowIcon";
import NextArrow from "../Common/NextArrowIcon";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

/**
 *
 * React component to rewatch a video before uploading it to the database.
 *
 * @return the front-end for the RewatchVideo page.
 *
 */
function RewatchVideoPage() {
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [isPreviousPage, setIsPreviousPage] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [show, setShow] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const textCode = useSelector((state) => state.orders.textCode);
  const videoPath = useSelector((state) => state.orders.videoPath);

  /**
   *
   * UseEffect to fetch the (video)data by textcode from the database. If fetching succeeds
   * the data will get set by the setVideoData function that updates videoData.
   *
   */
  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await axios.get(
        "http://localhost:4000/api/orders/order/" + textCode
      );

      setVideoData(data);
    };

    fetchVideoData();
  }, [textCode]);

  /**
   *
   * UseEffect to check the progressbar and the videotime (mm:ss) watched.
   * Everytime isVideoTime or isVideoWatchedTime is changed, useEffect will
   * re-render these particular functions
   *
   */
  useEffect(() => {
    setMinutes(Math.floor(isVideoWatchedTime / 60));
    setSeconds(
      Math.floor(isVideoWatchedTime) - Math.floor(isVideoWatchedTime / 60) * 60
    );

    setProgressBar(
      <div className="progress">
        <div
          title="Tijd"
          className="progress-bar"
          role="progressbar"
          aria-valuenow="1"
          style={{ width: (100 / isVideoTime) * isVideoWatchedTime + "%" }}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    );
  }, [isVideoTime, isVideoWatchedTime]);

  /**
   *
   * Handlers to show or hide the modal by setting it true or false.
   *
   */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Play button state to check video replay, is playing or is paused.
   * @returns null by default or one of three buttons depending on the state.
   */
  const videoPlayPauseButton = (state) => {
    switch (state) {
      case 1:
        return (
          <button
            className="btn btn-secondary my-3 mx-4"
            onClick={() => setVideoState(2)}
          >
            Afspelen
          </button>
        );
      case 2:
        return (
          <button
            className="btn btn-secondary my-3 mx-4"
            onClick={() => setVideoState(1)}
          >
            Pauzeren
          </button>
        );
      case 3:
        return (
          <button
            className="btn btn-secondary my-3 mx-4"
            onClick={() => setVideoState(2)}
          >
            Opnieuw afspelen
          </button>
        );
      default:
        return null;
    }
  };

  /**
   *
   * Video player settings for a video. It shows the progressBar, minutes and seconds and the three (state) buttons.
   * Everytime minutes, seconds, progressBar or videoState gets changed, it will be re-rendered by the useCallback.
   *
   */
  const videoPlayerSettings = useCallback(() => {
    return (
      <>
        {progressBar}
        <div>
          {(minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds === 60 ? "00" : seconds)}
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => setIsPreviousPage(true)}
        >
          {<BackArrow />}&nbsp;Vorige stap
        </button>
        {videoPlayPauseButton(videoState)}
        <Button variant="secondary" onClick={handleShow}>
          Volgende stap&nbsp;
          {<NextArrow />}
        </Button>
      </>
    );
  }, [minutes, progressBar, seconds, videoState]);

  /**
   *
   * If video is still loading it will render an spinner icon or text.
   * If video is done loading it will render the function videoPlayerSettings.
   * If videoPlayerSettings gets changed, it will get re-rendered by the useCallback.
   *
   */
  const loadingPlayer = useCallback(
    (loading) => {
      if (loading) {
        return (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        );
      } else {
        return videoPlayerSettings();
      }
    },
    [videoPlayerSettings]
  );

  /**
   *
   * Video player that uses the ReactPlayer component and the useCallback function that returns a memoized version
   * of the callback that only changes if one of the dependencies has changed. So everytime videoData, isLoading,
   * loadingPlayer or videoState is changed, it will be re-rendered
   *
   */
  const videoPlayer = useCallback(() => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <h2>Video terugkijken</h2>
            <p>
              Hier kan je jouw video terugkijken voordat je deze opstuurt naar
              de ontvanger. Zo weet je zeker dat jouw video perfect is.
            </p>
          </div>
        </div>
        <ReactPlayer
          url={
            "http://localhost:4000/api/videos/video/" +
            (videoData ? videoData.data.videoName : null)
          }
          width="100%"
          height="100%"
          playing={videoState === 2 ? true : false}
          progressInterval={100}
          onReady={() => setIsLoading(false)}
          onEnded={() => setVideoState(3)}
          onDuration={(time) => setIsVideoTime(time)}
          onProgress={({ playedSeconds }) =>
            setIsVideoWatchedTime(playedSeconds)
          }
        />
        {loadingPlayer(isLoading)}
      </>
    );
  }, [videoData, isLoading, loadingPlayer, videoState]);

  /**
   *
   * Events to navigate to different (step) pages.
   *
   */
  if (!textCode) {
    return <Navigate to="/buyer/noTextCode" />;
  }
  if (isPreviousPage === true) {
    return <Navigate to={"/buyer/" + videoPath} />;
  }
  if (isNextPage === true) {
    return <Navigate to="/buyer/personalize/" />;
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        {videoPlayer()}
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Weet je zeker dat de video zo goed is?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Als je op de knop <b>"Video opslaan"</b> klikt, dan wordt de video
              opgeslagen en gaat u door naar de volgende stap. Als je de video
              wilt veranderen, dan druk je op de knop <b>"Sluiten"</b>.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Sluiten
              </Button>
              <Button variant="primary" onClick={() => setIsNextPage(true)}>
                Video opslaan
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default RewatchVideoPage;
