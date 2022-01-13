import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
import TimeComponent from "./TimerComponent";
import PlayerPlayPauseButtons from "./PlayerPlayPauseButtons";
import Message from "./CreateMessage";

/**
 *
 * React component for the video player
 *
 * @return video player component
 */
const VideoPlayer = (props) => {
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [videoTime, setVideoTime] = useState(null);
  const [warningVideoDuration, setWarningVideoDuration] = useState(null);
  const [videoWatchedTime, setVideoWatchedTime] = useState(null);

  useEffect(() => {
    if (
      videoTime < 2 &&
      videoTime !== null &&
      warningVideoDuration !== videoTime &&
      props.created
    ) {
      setWarningVideoDuration(videoTime);
      if (props.setError) {
        props.setError(
          Message(
            "De video die u heeft geupload is korter dan 2 seconden. Weet u zeker dat dit correct is?",
            () => props.setError(null),
            "warning"
          )
        );
      }
    }
  }, [videoTime, warningVideoDuration, props]);

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
      console.log(videoTime);
      return (
        <>
          <PlayerPlayPauseButtons
            setFullScreen={props.setFullScreen}
            state={videoState}
            setVideoState={setVideoState}
          />

          <ProgressBar current={videoWatchedTime} max={videoTime} />
          <TimeComponent time={videoWatchedTime} />
        </>
      );
    }
  };
  console.log(props.videoData);

  return (
    <>
      <div className="row" id="rewatchVideoComponent">
        <h2>{props.title}</h2>
        <hr />
      </div>
      <div className="mb-5 rewatchVideoPlayer">
        {props.videoData === null ? (
          <Spinner />
        ) : (
          <ReactPlayer
            url={
              props.url + (props.videoData ? props.videoData.videoName : null)
            }
            width="100%"
            height="100%"
            playing={videoState === 2 ? true : false}
            progressInterval={100}
            onReady={() => setIsLoading(false)}
            onEnded={() => setVideoState(3)}
            onDuration={(time) =>
              setVideoTime(
                props.videoData.videoDuration
                  ? props.videoData.videoDuration
                  : time
              )
            }
            onProgress={({ playedSeconds }) =>
              setVideoWatchedTime(playedSeconds)
            }
            fullscreen={true}
          />
        )}
        {loadingPlayer(isLoading)}
      </div>
    </>
  );
};

export default VideoPlayer;
