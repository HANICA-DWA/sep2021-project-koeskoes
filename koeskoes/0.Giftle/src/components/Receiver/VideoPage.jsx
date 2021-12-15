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

/**
 * Page showing the video (by textCode) for the receiver
 *
 * @return the front-end for the VideoPage
 */
function VideoPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState({});
  const [videoError, setVideoError] = useState(null);
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const watched = useSelector((state) => state.videos.watched);

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

  useEffect(() => {
    if (!watched) {
      if (isVideoWatchedTime != null && isVideoTime != null) {
        if (Math.floor(isVideoWatchedTime) === Math.floor(isVideoTime / 2)) {
          dispatch(sendVideoWatchedMail(textCode));
        }
      }
    }

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
        {progressBar}
        <div>
          {(minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds === 60 ? "00" : seconds)}
        </div>
        {videoPlayButton(videoState)}
        <button
          className="btn btn-primary"
          onClick={() => navigate("/receiver/reaction")}
        >
          Verstuur een reactie&nbsp;
          <RightArrow />
        </button>
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
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    } else {
      return videoPlayerSettings();
    }
  };

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
          <h1>Er is geen video gevonden met deze code.</h1>
          <button className="btn btn-primary">Terug</button>
        </>
      );
    }
    if (videoError === false) {
      return (
        <>
          <h2>Videoboodschap voor {videoData.nameReceiver}</h2>
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
