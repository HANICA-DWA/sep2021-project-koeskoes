import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ErrorMessage from "./CreateErrorMessage";
import { setVideo } from "../../redux/actions/videoActions";
import Spinner from "./Spinner";

// import SVG as ReactComponent for easier use
import { ReactComponent as FileUpload } from "../../assets/file-upload.svg";

const UploadVideo = (props) => {
  const dispatch = useDispatch();
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  /**
   *
   * This function will send the uploaded video file to the server.
   * If this file is not a video format it will generate an error.
   *
   */
  const convertVideo = async () => {
    if (uploadedVideo === null) {
      return props.setError
        ? props.setError(
            ErrorMessage(
              "Kies een geldige videoformaat bestand (.mp4, .mov).",
              () => props.setError(null)
            )
          )
        : null;
    }
    const sourceVideoFile = uploadedVideo.files[0];

    setUploading(true);

    if (sourceVideoFile.type.split("/")[0] === "video") {
      const formData = new FormData();

      formData.append("video", sourceVideoFile, sourceVideoFile.name);

      const uploadResponse = await axios.patch(props.uploadPath, formData);

      if (uploadResponse.data.status === "error") {
        setUploading(false);
        return props.setError
          ? props.setError(
              ErrorMessage(uploadResponse.data.message, () =>
                props.setError(null)
              )
            )
          : null;
      } else {
        return dispatch(setVideo(uploadResponse.data));
      }
    } else {
      setUploading(false);
      return props.setError
        ? props.setError(
            ErrorMessage(
              "Kies een geldige videoformaat bestand. Andere formaten zijn niet toegestaan.",
              () => props.setError(null)
            )
          )
        : null;
    }
  };

  return (
    <>
      {!uploading ? (
        <>
          <div className="row video-rem5">
            <input
              type="file"
              name="uploadedVideo"
              accept="video/*"
              className="form-control mx-auto mb-3"
              id="fileInput"
              onChange={(e) => setUploadedVideo(e.target)}
            />
          </div>
          <div className="row mb-5">
            <button
              className="btn btn-primary mx-auto"
              style={{ width: "51%" }}
              id="upload"
              onClick={convertVideo}
            >
              Upload video&nbsp;
              <FileUpload />
            </button>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UploadVideo;
