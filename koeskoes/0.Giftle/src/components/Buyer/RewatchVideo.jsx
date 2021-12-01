import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Navigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackArrow from "../Common/BackArrowIcon";
import NextArrow from "../Common/NextArrowIcon";

function RewatchVideo() {
  const { textCode } = useParams();
  const [videoData, setVideoData] = useState({});
  const [videoError, setVideoError] = useState(null);
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [isPreviousPage, setIsPreviousPage] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      const videoRequest = await axios.get(
        "http://localhost:4000/videos/" + textCode
      );

      if (!videoRequest.data.status) {
        console.log(videoRequest.data);
        setVideoData(videoRequest.data);
        return setVideoError(false);
      } else {
        setVideoData(null);
        return setVideoError(true);
      }
    };

    getVideo();
  }, [textCode]);

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
        <button
          className="btn btn-secondary"
          onClick={() => setIsNextPage(true)}
        >
          Volgende stap&nbsp;
          {<NextArrow />}
        </button>
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
    return <Navigate to="/personalize" />; // Deze moet nog naar volgende stap!
  }

  const videoPlayer = () => {
    if (videoError === null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    if (videoError === true) {
      return (
        <>
          <h1>Er is geen video gevonden met deze code.</h1>
          <button className="btn btn-primary">Terug</button>
        </>
      );
    }
    if (videoError === false) {
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
      </div>
    </div>
  );
}

export default RewatchVideo;
