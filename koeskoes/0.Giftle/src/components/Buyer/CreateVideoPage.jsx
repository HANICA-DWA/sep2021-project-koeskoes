import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../Common/Camera";
import UploadVideo from "../Common/UploadVideo";
import VideoPlayer from "../Common/VideoPlayer";
import PersonalizationForm from "../Common/PersonalizationForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  setVideoCreationPath,
  setVideoUploaded,
  setPersonalized,
  changeUploadVisualState,
} from "../../redux/actions/uploadActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as DownUpArrow } from "../../assets/arrow-down-up.svg";
import { ReactComponent as RepeatArrow } from "../../assets/arrow-repeat.svg";

/**
 *
 * React component to record video's from the webcam.
 *
 * @return the front-end for the recording page
 *
 */
function CreateVideoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const textCode = useSelector((state) => state.orders.textCode);
  const videoCreationPath = useSelector(
    (state) => state.uploads.videoCreationPath
  );
  const videoUploaded = useSelector((state) => state.uploads.videoUploaded);
  const uploadVisualState = useSelector(
    (state) => state.uploads.uploadVisualState
  );
  const personalized = useSelector((state) => state.uploads.personalized);
  const video = useSelector((state) => state.videos.video);

  /**
   *
   * Events to navigate to different pages.
   *
   */
  useEffect(() => {
    if (!textCode) {
      return navigate("/buyer/noTextCode");
    }
  }, [textCode, navigate]);

  useEffect(() => {
    if (video !== "") {
      dispatch(setVideoUploaded());
      dispatch(changeUploadVisualState(2));
    }
  }, [video, dispatch]);

  const goToPersonalization = () => {
    setFullScreen(false);
    dispatch(setPersonalized());
    dispatch(changeUploadVisualState(3));
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div
        className={`${fullScreen ? `container-flex` : ( `container ` + (personalized ? "container-wide" : null))} text-center rounded p-3 bg-light mt-4 mb-4`}
      >
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-5 col-5">
            {uploadVisualState === 1 ? (
              <button
                className="btn btn-primary float-start"
                onClick={() =>
                  dispatch(
                    setVideoCreationPath(
                      videoCreationPath === "upload" ? "record" : "upload"
                    )
                  )
                }
              >
                {videoCreationPath === "upload" ? `Record` : `Upload`}
                &nbsp;
                <DownUpArrow />
              </button>
            ) : (
              <button
                className="btn btn-primary float-start"
                onClick={() => {
                  setFullScreen(false);
                  dispatch(changeUploadVisualState(1));
                }}
              >
                Opnieuw{" "}
                {videoCreationPath === "upload" ? "uploaden" : "opnemen"}&nbsp;
                <RepeatArrow />
              </button>
            )}
          </div>
          <div className="col-lg-2 col-md-1 col-sm-1 col-1"></div>
          <div className="col-lg-5 col-md-6 col-sm-6 col-6">
            {videoUploaded && uploadVisualState === 1 ? (
              <button
                className="btn btn-primary float-end"
                onClick={() => dispatch(changeUploadVisualState(2))}
              >
                Gebruik vorige video&nbsp;
                {<RightArrow />}
              </button>
            ) : uploadVisualState === 2 ? (
              <button
                className="btn btn-primary float-end"
                onClick={() => goToPersonalization()}
              >
                Personaliseren&nbsp;
                {<RightArrow />}
              </button>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div
            className={`${
              personalized && !fullScreen ? "col-lg-6" : "col-lg-12"
            } col-md-12 col-sm-12 ${personalized ? "item-center" : null}`}
          >
            {uploadVisualState === 1 ? (
              videoCreationPath === "upload" ? (
                <UploadVideo
                  uploadPath={`http://localhost:4000/api/orders/order/video/${textCode}`}
                  setError={setError}
                />
              ) : (
                <Camera
                  uploadPath={`http://localhost:4000/api/orders/order/video/${textCode}`}
                  setError={setError}
                />
              )
            ) : (
              <VideoPlayer
                title="Uw video terugkijken"
                url={"http://localhost:4000/api/videos/video/"}
                videoData={video}
                created={true}
                setFullScreen={() =>
                  setFullScreen(
                    (prevScreenState) => (prevScreenState = !prevScreenState)
                  )
                }
              />
            )}
            {uploadVisualState === 1 ? (
              <p className="mt-3">
                Door een video{" "}
                {videoCreationPath === "upload" ? "te uploaden" : "op te nemen"}{" "}
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
          {personalized && fullScreen ? <div className="col-lg-3"></div> : null}
          <div className="col-lg-6 col-md-12 col-sm-12">
            {personalized ? (
              <PersonalizationForm
                next={() => navigate("/buyer/thankyou")}
                setError={setError}
                disabled={uploadVisualState !== 3}
              />
            ) : null}
          </div>
          {personalized && fullScreen ? <div className="col-lg-3"></div> : null}
        </div>
      </div>
    </div>
  );
}

export default CreateVideoPage;
