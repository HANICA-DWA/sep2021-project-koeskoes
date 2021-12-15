import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
import TimeComponent from "./TimerComponent";
import { ReactComponent as PauseButton } from "../../assets/pause.svg";
import { ReactComponent as PlayButton } from "../../assets/play.svg";
import { ReactComponent as ReplayButton } from "../../assets/replay.svg";

/**
 *
 * React component to rewatch a video before uploading it to the database.
 *
 * @return the front-end for the RewatchVideo page.
 *
 */
const VideoPlayer = (props) => {
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [videoData, setVideoData] = useState(null);

  /**
   *
   * UseEffect to fetch the (video)data by textcode from the database. If fetching succeeds
   * the data will get set by the setVideoData function that updates videoData.
   *
   */
  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await axios.get(props.videoCreationPath);

      setVideoData(data);
    };

    fetchVideoData();
  }, [props]);

  /**
   * Play button state to check video replay, is playing or is paused.
   * @returns null by default or one of three buttons depending on the state.
   */
  const videoPlayPauseButton = (state) => {
    switch (state) {
      case 1:
        return (
          <button
            className="btn btn-primary btn-round btn-record"
            onClick={() => setVideoState(2)}
          >
            <PlayButton />
          </button>
        );
      case 2:
        return (
          <button
            className="btn btn-primary btn-round btn-record"
            onClick={() => setVideoState(1)}
          >
            <PauseButton />
          </button>
        );
      case 3:
        return (
          <button
            className="btn btn-primary btn-round btn-record"
            onClick={() => setVideoState(1)}
          >
            <ReplayButton />
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
        {videoPlayPauseButton(videoState)}
        <ProgressBar current={isVideoWatchedTime} max={isVideoTime} />
        <TimeComponent time={isVideoWatchedTime} />
      </>
    );
  }, [videoState, isVideoTime, isVideoWatchedTime]);

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
        return <Spinner />;
      } else {
        return videoPlayerSettings();
      }
    },
    [videoPlayerSettings]
  );

  return (
    <>
      <div className="row">
        <h2>{props.title}</h2>
        <hr />
      </div>
      <div className="row">
        <p>Als je geluid hebt opgenomen, controleer dan hier of het geluid correct is opgenomen.</p>
      </div>
      <div style={{ width: "100%" }} className="mb-5 rewatchVideoPlayer">
        <ReactPlayer
          url={props.url + (videoData ? videoData.data.videoName : null)}
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
      </div>
    </>
  );
};

export default VideoPlayer;
