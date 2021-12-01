import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Navigate } from "react-router";
import { useParams } from "react-router-dom";
import BackArrow from "../Common/BackArrowIcon";
import NextArrow from "../Common/NextArrowIcon";
import { Button, Modal } from "react-bootstrap";

function RewatchVideo() {
  const { textCode } = useParams();
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const videoPlayButton = (state) => {
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

  const videoPlayerSettings = () => {
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
        {videoPlayButton(videoState)}
        <Button variant="secondary" onClick={handleShow}>
          Volgende stap&nbsp;
          {<NextArrow />}
        </Button>
      </>
    );
  };

  const loadingPlayer = (loading) => {
    if (loading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return videoPlayerSettings();
    }
  };

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isPreviousPage === true) {
    return <Navigate to="/buyer" />;
  }
  if (isNextPage === true) {
    return <Navigate to={`/personalize/` + textCode} />; // Deze moet nog naar volgende stap!
  }

  const videoPlayer = () => {
    if (textCode === null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    if (textCode === "") {
      return (
        <>
          <h1>Er is geen video gevonden met deze code.</h1>
          <button className="btn btn-primary">Terug</button>
        </>
      );
    }
    if (textCode !== "") {
      return (
        <>
          <div class="row">
            <div class="col-12">
              <h2>Video terugkijken</h2>
              <p>
                Hier kan je jouw video terugkijken voordat je deze opstuurt naar
                de ontvanger. Zo weet je zeker dat jouw video perfect is.
              </p>
            </div>
          </div>
          <ReactPlayer
            url={"http://localhost:4000/videos/video/" + textCode}
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
    }
  };

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
