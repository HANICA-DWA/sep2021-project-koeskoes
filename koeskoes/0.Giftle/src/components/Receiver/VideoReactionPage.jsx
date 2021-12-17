import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Camera from "../Common/Camera";
import UploadVideo from "../Common/UploadVideo";
import VideoPlayer from "../Common/VideoPlayer";
import {
  setReactionCreationPath,
  setReactionUploaded,
  changeReactionUploadVisualState,
} from "../../redux/actions/reactionActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as PencilSquare } from "../../assets/pencil-square.svg";

function VideoReactionPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const reactionCreationPath = useSelector(
    (state) => state.reaction.reactionCreationPath
  );
  const reactionUploaded = useSelector(
    (state) => state.reaction.reactionUploaded
  );
  const reactionUploadVisualState = useSelector(
    (state) => state.reaction.reactionUploadVisualState
  );
  const reaction = useSelector((state) => state.reaction.reaction);

  console.log(reaction);

  useEffect(() => {
    if (reaction !== "") {
      dispatch(setReactionUploaded());
      dispatch(changeReactionUploadVisualState(2));
    }
  }, [reaction, dispatch]);

  useEffect(() => {
    setError(null);
  }, [reactionCreationPath]);

  const saveMessageData = () => {
    return null;
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div
        className={`${
          fullScreen ? `container-flex` : `container container-w40 `
        } text-center rounded p-3 bg-light mt-4 mb-4`}
      >
        <div className="row mb-4">
          <div className="col-5 text-start" id="text-reaction-switch">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/receiver/text-reaction/` + textCode)}
            >
              Tekstreactie versturen&nbsp;
              <PencilSquare />
            </button>
          </div>
        </div>
        <div className="row">
          <h1 id="video-reaction-title">Videoreactie verzenden</h1>
        </div>
        <p className="px-3">
          Om een videoreactie te versturen kies je hieronder tussen opnemen en
          uploaden.
        </p>

        <div className="row">
          <div className="">
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setFullScreen(false);
                dispatch(setReactionCreationPath("upload"));
              }}
            >
              Uploaden
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setFullScreen(false);
                dispatch(setReactionCreationPath("record"));
              }}
            >
              Opnemen
            </button>
          </div>
          {reactionUploaded && reactionUploadVisualState === 1 ? (
            <div className="col-xl-9 col-lg-7 col-md-6 col-6">
              <button
                className="btn btn-primary float-end"
                onClick={() => dispatch(changeReactionUploadVisualState(2))}
              >
                Gebruik vorige video&nbsp;
                {<RightArrow />}
              </button>
            </div>
          ) : null}
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            {reactionUploadVisualState === 1 ? (
              reactionCreationPath === "upload" ? (
                <>
                  <div className="row">
                    <p>
                      Klik op <b>Bestand kiezen</b> en selecteer een video of
                      sleep een bestand in hetzelfde vakje.
                      <br />
                      Om de video te uploaden moet je vervolgens op de{" "}
                      <b>Upload video</b> knop klikken.
                      <br />
                      De video moet de volgende resoluties hebben: <i>
                        1080p
                      </i>{" "}
                      of <i>720p</i>.
                    </p>
                  </div>
                  <UploadVideo
                    uploadPath={`http://localhost:4000/api/mails/reaction/video/${textCode}`}
                    setError={setError}
                  />
                </>
              ) : (
                <>
                  <Camera
                    uploadPath={`http://localhost:4000/api/mails/reaction/video/${textCode}`}
                    setError={setError}
                  />
                </>
              )
            ) : (
              <VideoPlayer
                title="Video terugkijken"
                url={"http://localhost:4000/api/videos/video/"}
                videoData={reaction}
                created={true}
                setFullScreen={() =>
                  setFullScreen(
                    (prevScreenState) => (prevScreenState = !prevScreenState)
                  )
                }
              />
            )}
            {reactionUploadVisualState === 1 ? (
              <p className="mt-4">
                Door een video{" "}
                {reactionCreationPath === "upload"
                  ? "te uploaden"
                  : "op te nemen"}{" "}
                gaat u akkoord met de{" "}
                <a
                  href="#algemene-voorwaarden"
                  className="terms-and-conditions"
                >
                  algemene voorwaarden
                </a>
                .
              </p>
            ) : null}
          </div>
        </div>

        <div className="row mt-5 mb-3">
          <div className="col-6 text-start">
            
          </div>
          <div className="col-6 text-end">
            <button
              className="btn btn-primary"
              onClick={() => saveMessageData()}
            >
              Versturen&nbsp;
              {<RightArrow />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoReactionPage;

// <button onclick="">Go Back</button>
