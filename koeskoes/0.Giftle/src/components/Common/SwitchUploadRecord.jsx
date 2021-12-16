import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setVideoCreationPath,
} from "../../redux/actions/uploadActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as DownUpArrow } from "../../assets/arrow-down-up.svg";

function SwitchUploadRecord (props){
  const dispatch = useDispatch();
  const videoCreationPath = useSelector(
    (state) => state.uploads.videoCreationPath
  );

  return(
    <div className="col-3">
      <div class="form-control-lg form-check form-switch  border rounded">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() =>
          dispatch(
            setVideoCreationPath(
              videoCreationPath === "upload" ? "record" : "upload"
            )
          )
        } />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          &nbsp;{videoCreationPath === "upload" ? "Record" : "Upload"}
        </label>
      </div>
    </div>
  );

}

export default SwitchUploadRecord;