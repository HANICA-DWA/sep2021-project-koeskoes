import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Spinner from "./Spinner";
import ProgressBar from "./ProgressBar";
import TimeComponent from "./TimerComponent";
import PlayerPlayPauseButtons from "./PlayerPlayPauseButtons";
import Message from "./CreateMessage";

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
  const [warningVideoDuration, setWarningVideoDuration] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);

  useEffect(() => {
    if (
      isVideoTime < 2 &&
      isVideoTime !== null &&
      warningVideoDuration !== isVideoTime &&
      props.created
    ) {
      setWarningVideoDuration(isVideoTime);
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
  }, [isVideoTime, warningVideoDuration, props]);

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

  return (
    <>
      <div className="row" id="rewatchVideoComponent">
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
        {props.videoData === null ? (
          <Spinner />
        ) : (
          <ReactPlayer
            url={props.url + (props.videoData ? props.videoData : null)}
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
        )}
        {loadingPlayer(isLoading)}
      </div>
    </>
  );
};

export default VideoPlayer;
