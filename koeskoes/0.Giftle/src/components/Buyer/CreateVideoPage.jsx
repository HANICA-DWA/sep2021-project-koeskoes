import React, { useState } from "react";
import NextArrowIcon from "../Common/NextArrowIcon";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../Common/Camera";
import UploadVideo from "../Common/UploadVideo";
import VideoPlayer from "../Common/VideoPlayer";
import PersonalizationForm from "../Common/PersonalizationForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  setVideoPath,
  setVideoUploaded,
  setPersonalized,
  changeUploadVisualState,
} from "../../redux/actions/uploadActions";

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
  const textCode = useSelector((state) => state.orders.textCode);
  const videoPath = useSelector((state) => state.uploads.videoPath);
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
    dispatch(setPersonalized());
    dispatch(changeUploadVisualState(3));
  }

  return (
    <div className="vertical-center colored-background">
      {error}
      <div
        className={`container ${
          personalized ? "container-wide" : null
        } text-center rounded p-3 bg-light mt-4 mb-4`}
      >
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-5 col-5">
            {uploadVisualState === 1 ? (
              <button
                className="btn btn-primary float-start"
                onClick={() =>
                  dispatch(
                    setVideoPath(videoPath === "upload" ? "record" : "upload")
                  )
                }
              >
                {videoPath === "upload" ? "Record" : "Upload"}
              </button>
            ) : (
              <button
                className="btn btn-primary float-start"
                onClick={() => dispatch(changeUploadVisualState(1))}
              >
                Opnieuw {videoPath === "upload" ? "uploaden" : "opnemen"}
              </button>
            )}
          </div>
          <div className="col-lg-4 col-md-1 col-sm-1 col-1"></div>
          <div className="col-lg-5 col-md-6 col-sm-6 col-6">
            {videoUploaded && uploadVisualState === 1 ? (
              <button
                className="btn btn-primary float-end"
                onClick={() => dispatch(changeUploadVisualState(2))}
              >
                Gebruik vorige video
                {<NextArrowIcon />}
              </button>
            ) : uploadVisualState === 2 ? (
              <button
                className="btn btn-primary float-end"
                onClick={() => goToPersonalization()}
              >
                Personaliseren
                {<NextArrowIcon />}
              </button>
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className={`${personalized ? "col-lg-6" : "col-lg-12" } col-md-12 col-sm-12`}>
            {uploadVisualState === 1 ? (
              videoPath === "upload" ? (
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
                videoPath={`http://localhost:4000/api/orders/order/` + textCode}
              />
            )}
            {uploadVisualState === 1 ? (
              <p className="mt-3">
                Door een video{" "}
                {videoPath === "upload" ? "te uploaden" : "op te nemen"} gaat u
                akkoord met de{" "}
                <a href="#algemene-voorwaarden">algemene voorwaarden</a>.
              </p>
            ) : null}
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            {personalized ? <PersonalizationForm next={() => navigate("/buyer/thankyou")} setError={setError} disabled={uploadVisualState !== 3} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVideoPage;
