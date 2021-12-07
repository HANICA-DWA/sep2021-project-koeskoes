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
 * React component to rewatch a video.
 *
 * @return the front-end for the rewatch page
 *
 */
function RewatchVideo() {
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
   * UseEffect to get the videodata by textcode from the database
   *
   */
  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await axios.get(
        "http://localhost:4000/orders/order/" + textCode
      );

      setVideoData(data);
    };

    fetchVideoData();
  }, [textCode]);

  /**
   *
   * UseEffect to check progressbar and videotime watched.
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
   * Handlers to show modal.
   *
   */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Play button state to check video is playing or is paused.
   * @returns null or a button.
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
   * Video settings for the video
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
   * Loading icon if video is loading
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
   * Full video player.
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
            "http://localhost:4000/videos/video/" +
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
   * Events to navigate to different pages.
   *
   */
  if (!textCode) {
    return <Navigate to="/noTextCode" />;
  }
  if (isPreviousPage === true) {
    return <Navigate to={"/" + videoPath} />;
  }
  if (isNextPage === true) {
    return <Navigate to="/personalize/" />;
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

export default RewatchVideo;
