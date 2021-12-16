import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
import TimeComponent from "./TimerComponent";
import PlayerPlayPauseButtons from "./PlayerPlayPauseButtons";
import { useSelector } from "react-redux";

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
  // const [videoData, setVideoData] = useState(null);
  const videoData = useSelector(state => state.videos.video);

  /**
   *
   * UseEffect to fetch the (video)data by textcode from the database. If fetching succeeds
   * the data will get set by the setVideoData function that updates videoData.
   *
   */
  // useEffect(() => {
  //   const fetchVideoData = async () => {
  //     const data = await axios.get(props.videoCreationPath);

  //     setVideoData(data);
  //   };

  //   fetchVideoData();
  // }, [props]);

  /**
   *
   * If video is still loading it will render an spinner icon or text.
   * If video is done loading it will render the function videoPlayerSettings.
   * If videoPlayerSettings gets changed, it will get re-rendered by the useCallback.
   *
   */
  const loadingPlayer = (loading) => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          <PlayerPlayPauseButtons
            setFullScreen={props.setFullScreen}
            state={videoState}
            setVideoState={setVideoState}
          />
          <ProgressBar current={isVideoWatchedTime} max={isVideoTime} />
          <TimeComponent time={isVideoWatchedTime} />
        </>
      );
    }
  };

  console.log(videoData);

  return (
    <>
      <div className="row">
        <h2>{props.title}</h2>
        <hr />
      </div>
      {props.created ? (
        <div className="row">
          <p>
            Als je geluid hebt opgenomen, controleer dan hier of het geluid
            correct is opgenomen.
          </p>
        </div>
      ) : null}
      <div className="mb-5 rewatchVideoPlayer">
        <ReactPlayer
          url={props.url + (props.videoData ? props.videoData.videoName : null)}
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
          fullscreen={true}
        />
        {loadingPlayer(isLoading)}
      </div>
    </>
  );
};

export default VideoPlayer;
