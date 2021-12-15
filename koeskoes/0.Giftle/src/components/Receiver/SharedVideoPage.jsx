import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "../Common/ProgressBar";
import TimeComponent from "../Common/TimerComponent";
import Spinner from "../Common/Spinner";

// import SVG as ReactComponent for easier use
import { ReactComponent as PlayCircle } from "../../assets/play-circle.svg";
import { ReactComponent as PauseCircle } from "../../assets/pause-circle.svg";
import { ReactComponent as ReplayCircle } from "../../assets/arrow-clockwise.svg";

/**
 * Page showing the video (by textCode) for the receiver
 *
 * @return the front-end for the VideoPage
 */
function SharedVideoPage() {
  const { textCode } = useParams();
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState({});
  const [videoError, setVideoError] = useState(null);
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const watched = useSelector((state) => state.videos.watched);

  useEffect(() => {
    const getVideo = async () => {
      const videoRequest = await axios.get(
        "http://localhost:4000/api/videos/" + textCode
      );

      if (!videoRequest.data.status) {
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
  }, [isVideoTime, isVideoWatchedTime, textCode, dispatch, watched]);

  /**
   *
   * Video play button with state indicating what button to show
   *
   * @param state state with: case 1. "play" - case 2. "pause" - case 3. "replay"
   * @returns button with the state, indicating what button to show
   *
   */
  const videoPlayButton = (state) => {
    switch (state) {
      case 1:
        return (
          <button
            className="btn btn-primary my-3 mx-4"
            onClick={() => setVideoState(2)}
          >
            Afspelen&nbsp;
            <PlayCircle />
          </button>
        );
      case 2:
        return (
          <button
            className="btn btn-primary my-3 mx-4"
            onClick={() => setVideoState(1)}
          >
            Pauzeren&nbsp;
            <PauseCircle />
          </button>
        );
      case 3:
        return (
          <button
            className="btn btn-primary my-3 mx-4"
            onClick={() => setVideoState(2)}
          >
            Opnieuw afspelen&nbsp;
            <ReplayCircle />
          </button>
        );
      default:
        return null;
    }
  };

  /**
   *
   * Videoplayer settings for the video
   *
   * @returns progressbar with timer, two buttons for the step proces and a button indicating "pause" of "play"
   *
   */
  const videoPlayerSettings = () => {
    return (
      <>
        <ProgressBar current={isVideoWatchedTime} max={isVideoTime} />
        <TimeComponent time={isVideoWatchedTime} />
        {videoPlayButton(videoState)}
      </>
    );
  };

  /**
   *
   * Loading icon if the video is still loading (fetching data)
   *
   * @param loading boolean if true show loading, if false return function
   * @returns loading spinner or text if loading is true, if loading is false return function
   *
   */
  const loadingPlayer = (loading) => {
    if (loading) {
      return <Spinner />;
    } else {
      return videoPlayerSettings();
    }
  };

  /**
   *
   * Videoplayer to show the video.
   *
   * @returns video by textCode if fetching from DB succeeds or error message if fetching from DB fails
   *
   */
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
          <h2>Videoboodschap voor {videoData.nameReceiver}</h2>
          <hr />
          <ReactPlayer
            url={
              "http://localhost:4000/api/videos/video/" + videoData.videoName
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

export default SharedVideoPage;
