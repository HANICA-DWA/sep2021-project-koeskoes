import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendVideoWatchedMail } from "../../redux/actions/videoActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as PlayCircle } from "../../assets/play-circle.svg";
import { ReactComponent as PauseCircle } from "../../assets/pause-circle.svg";
import { ReactComponent as ReplayCircle } from "../../assets/arrow-clockwise.svg";
import { ReactComponent as ShareIcon } from "../../assets/share-fill.svg";
import VideoPlayer from "../Common/VideoPlayer";
/**
 * Page showing the video (by textCode) for the receiver
 *
 * @return the front-end for the VideoPage
 */
function VideoPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState({});
  const [videoError, setVideoError] = useState(null);

  const [isPopUp, setIsPopUp] = useState(false);

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


  
  const showPopUp = () => {
    const videoURL = `http://localhost:3000/receiver/watchSharedVideo/${textCode}`;
    if (isPopUp) {
      return (
        <span class="popuptext" id="myPopup">
          <div className="icon-container">
            <div className="icon">
              <EmailShareButton
                url={videoURL}
                quote="Wow kijk, ik heb deze Giftle ontvangen! Klik op de link om de Giftle ook te bekijken."
              >
                <EmailIcon size={30} round={true} />
              </EmailShareButton>
            </div>
            <div className="icon">
              <TwitterShareButton
                url={videoURL}
                title="Wow kijk, ik heb deze Giftle ontvangen! Klik op de link om de Giftle ook te bekijken."
              >
                <TwitterIcon size={30} round={true} />
              </TwitterShareButton>
            </div>
            <div className="icon">
              <FacebookShareButton
                url={videoURL}
                quote="Wow kijk, ik heb deze Giftle ontvangen! Klik op de link om de Giftle ook te bekijken."
              >
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>
            </div>
            <div className="icon">
              <WhatsappShareButton
                url={videoURL}
                title="Wow kijk, ik heb deze Giftle ontvangen! Klik op de link om de Giftle ook te bekijken."
                separator=" - "
              >
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </span>
      );
    } else {
      return null;
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
          <button
            className="btn btn-primary reactionButton"
            onClick={() => navigate("/receiver/reaction")}
          >
            Verstuur een reactie&nbsp;
            <RightArrow />
          </button>
          <hr />
          <div className="text-start float-start">
            <h3>Afzender:</h3>
            {videoData.nameGifter ? <h5>{videoData.nameGifter}</h5> : null}
            {videoData.emailGifter ? <h5>{videoData.emailGifter}</h5> : null}
          </div>
          <div className="float-end shareButtonPlacement popup">
            {showPopUp()}
            <button
              className="btn btn-primary"
              onClick={() => {
                if (isPopUp) {
                  setIsPopUp(false);
                } else {
                  setIsPopUp(true);
                }
              }}
            >
              Delen &nbsp;
              <ShareIcon />
            </button>
          </div>
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

export default VideoPage;
