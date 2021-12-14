import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setVideoCreationPath } from "../../redux/actions/uploadActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as FileUpload } from "../../assets/file-upload.svg";
import { ReactComponent as RecordCircle } from "../../assets/record-circle.svg";

/**
 * This component creates the starting page for the buyer proces.
 * @returns the html for the start of the buyer video upload proces.
 */
function HomeBuyerPage() {
  const dispatch = useDispatch();
  // Creates the state for checking if the corresponding button has been clicked
  // Flips to true if clicked and then navigates to the corresponding url/ component
  const [isBtnRecord, setIsBtnRecord] = useState(false);
  const [isBtnUpload, setIsBtnUpload] = useState(false);
  const textCode = useSelector((state) => state.orders.textCode);

  // Navigation functionality to send the user to a different page after a certain action.
  if (!textCode) {
    return <Navigate to="/noTextCode" />;
  }

  if (isBtnRecord === true) {
    dispatch(setVideoCreationPath("record"));
    return <Navigate to="/buyer/create" />;
  }

  if (isBtnUpload === true) {
    dispatch(setVideoCreationPath("upload"));
    return <Navigate to="/buyer/create" />;
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Welkom op Giftle!</h1>
        <p className="mt-3 mb-5">
          Wilt u een video meesturen met uw cadeau? Als u een video heeft, kunt
          u deze uploaden. Er kan ook een video worden opgenomen.
        </p>
        <button
          className="btn btn-primary mx-4"
          onClick={() => setIsBtnRecord(true)}
        >
          Opnemen&nbsp;
          <RecordCircle />
        </button>
        <button
          className="btn btn-primary mx-4"
          onClick={() => setIsBtnUpload(true)}
        >
          Uploaden&nbsp;
          <FileUpload />
        </button>
      </div>
    </div>
  );
}

export default HomeBuyerPage;
