import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Reused Common components
import Spinner from "../Common/Spinner";
import VideoPlayer from "../Common/VideoPlayer";

/**
 * Page showing the video (by textCode) for the receiver
 *
 * @return the front-end for the VideoPage
 */
function SharedVideoPage() {
  const { textCode } = useParams();
  const [videoData, setVideoData] = useState({});
  const [videoError, setVideoError] = useState(null);

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
          <Spinner />
        </div>
      );
    }
    if (videoError === true) {
      return (
        <>
          <h2>Er is geen video gevonden met deze code.</h2>
        </>
      );
    }
    if (videoError === false) {
      return (
        <>
          <VideoPlayer
            title={`Videoboodschap voor ${videoData.nameReceiver}`}
            url="http://localhost:4000/api/videos/video/"
            videoCreationPath={
              `http://localhost:4000/api/orders/order/` + textCode
            }
          />
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
