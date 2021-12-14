import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ErrorMessage from "./CreateErrorMessage";
import { setVideo } from "../../redux/actions/videoActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as FileUpload } from "../../assets/file-upload.svg";

const UploadVideo = (props) => {
  const dispatch = useDispatch();
  const [uploadedVideo, setUploadedVideo] = useState(null);

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
            ErrorMessage("Kies een bestand!", () => props.setError(null))
          )
        : null;
    }
    const sourceVideoFile = uploadedVideo.files[0];

    if (sourceVideoFile.type.split("/")[0] === "video") {
      const formData = new FormData();

      formData.append("video", sourceVideoFile, sourceVideoFile.name);

      const uploadResponse = await axios.patch(props.uploadPath, formData);

      if (uploadResponse.data.status === "error") {
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
      return props.setError
        ? props.setError(
            ErrorMessage("Kies een geldig video bestand!", () =>
              props.setError(null)
            )
          )
        : null;
    }
  };

  return (
    <>
      <div className="row">
        <h1>Uw video uploaden</h1>
      </div>
      <div className="row">
        <input
          type="file"
          name="uploadedVideo"
          accept="video/*"
          className="form-control mx-auto mb-3"
          onChange={(e) => setUploadedVideo(e.target)}
        />
      </div>
      <div className="row">
        <button
          className="btn btn-primary mx-auto"
          style={{ width: "51%" }}
          onClick={convertVideo}
        >
          Upload video&nbsp;
          <FileUpload />
        </button>
      </div>
    </>
  );
};

export default UploadVideo;
