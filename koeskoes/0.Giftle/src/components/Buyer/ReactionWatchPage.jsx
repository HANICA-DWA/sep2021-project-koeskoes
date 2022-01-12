import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getVideoReaction,
  getTextReaction,
} from "../../redux/actions/reactionActions";

// Re-used Common components
import VideoPlayer from "../Common/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";

/**
 * Page showing the video (by textCode) for the receiver
 *
 * @return the front-end for the VideoPage
 */
function ReactionVideoPage() {
  const { textCode } = useParams();
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const reaction = useSelector((state) => state.uploads.reaction);

  /**
   * A useEffect to collect all video data from the database using Redux State
   */
  useEffect(() => {
    dispatch(getTextReaction(textCode));
    dispatch(getVideoReaction(textCode));
  }, [textCode, dispatch]);

  /**
   *
   * Videoplayer to show the video.
   *
   * @returns video by textCode if fetching from DB succeeds or error message if fetching from DB fails
   */
  const videoPlayer = () => {
    return (
      <>
        <VideoPlayer
          title={`Videoreactie van ${reaction.firstNameReceiver} ${reaction.lastNameReceiver}`}
          url="http://localhost:4000/api/videos/video/"
          videoData={reaction.answerVideo}
          setFullScreen={() =>
            setFullScreen(
              (prevScreenState) => (prevScreenState = !prevScreenState)
            )
          }
        />
      </>
    );
  };

  /**
   *
   * Box to show the text reaction.
   *
   * @returns box with text reaction
   */
  const textReaction = () => {
    return (
      <>
        <div>
          <h1 className="mb-5">
            Reactie van {reaction.firstNameReceiver} {reaction.lastNameReceiver}
          </h1>
          <p className="h4 pb-4">{reaction.answerText}</p>
        </div>
      </>
    );
  };

  if (reaction.answerVideo !== "" && reaction.answerVideo !== "null") {
    return (
      <div className="vertical-center colored-background">
        <div
          className={`${
            fullScreen ? `container-flex` : `container`
          } text-center rounded p-3 bg-light`}
        >
          {videoPlayer()}
        </div>
      </div>
    );
  } else if (reaction.answerText !== "" && reaction.answerText !== "null") {
    return (
      <div className="vertical-center colored-background">
        <div className="container container-w50 container-w80 text-center rounded bg-light">
          {textReaction()}
        </div>
      </div>
    );
  }
}

export default ReactionVideoPage;
