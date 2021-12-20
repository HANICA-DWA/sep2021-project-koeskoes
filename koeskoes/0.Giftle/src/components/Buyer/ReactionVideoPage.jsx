import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReaction } from "../../redux/actions/reactionActions";

// Reused Common components
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
    dispatch(getReaction(textCode));
  }, [textCode, dispatch]);

  /**
   *
   * Videoplayer to show the video.
   *
   * @returns video by textCode if fetching from DB succeeds or error message if fetching from DB fails
   *
   */
  const videoPlayer = () => {
    return (
      <>
        <VideoPlayer
          title={`Videoreactie van ${reaction.nameReceiver}`}
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
}

export default ReactionVideoPage;
