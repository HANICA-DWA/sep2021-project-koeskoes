import React, { useState, useEffect, useParams } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";

// import SVG as ReactComponent for easier use
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as CameraVideo } from "../../assets/camera-video.svg";

function TextReactionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();

  const saveMessageData = () => {
    const checkedMessage = checkMessage();

    if (checkedMessage.status === "error") {
      return setError(ErrorMessage(checkedMessage.message, () => setError(null)));
    }

    return navigate("/receiver");
  };

  const checkMessage = () => {
    const maxLength = 280;

    if(message === null || message.trim() === "") {
      return {
        status: "error",
        message: "Het bericht mag niet leeg zijn!",
      };
    }
    if (message.length > maxLength) {
      return {
        status: "error",
        message:
          `Het bericht mag maximaal ${maxLength} karakters lang zijn.`,
      };
    }
    return true;
  };
  

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light mt-4 mb-4">
        <div className="row mb-3">
          <div className="col-5 text-start">
            <button className="btn btn-primary" onClick={() => navigate("/receiver/video-reaction")}>
              Videoreactie versturen&nbsp;
              <CameraVideo />
            </button>
          </div>
        </div>
        <div className="row">
          <h1>Tekstreactie verzenden</h1>
        </div>
        <p>Om een tekstreactie te versturen vult u het tekstvakje hieronder in.</p>           
        <div className="row my-4 px-5">
          <h5 className="text-start">Schrijf hieronder uw bericht.</h5>
          <textarea rows="8" cols="30" placeholder="Schrijf hier uw bericht" onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div className="row mt-5 mb-3">
          <div className="col-6 text-start">
            <button className="btn btn-primary" onClick={() => console.log("TODO: via redux state path teruggaan")}>
              {<LeftArrow />}&nbsp;
              Bekijk video opnieuw
            </button>
          </div>
          <div className="col-6 text-end">
            <button className="btn btn-primary" onClick={() => saveMessageData()}>
              Versturen&nbsp;
              {<RightArrow />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default TextReactionPage;