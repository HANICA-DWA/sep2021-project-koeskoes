import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Common/CreateErrorMessage";

import { sendReaction } from "../../redux/actions/uploadActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as CameraVideo } from "../../assets/camera-video.svg";
import { useEffect } from "react";

function TextReactionPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();
  const reaction = useSelector((state) => state.uploads.reaction);

  // useEffect(() => {
  //   if () {
  //     return navigate("/receiver/reaction-sent");
  //   }
  // }, [, navigate]);

  useEffect(() => {
    if (reaction.status === "success") {
      navigate("/receiver/reaction-sent");
    }
  }, [reaction, navigate]);

  const saveMessageData = async () => {
    const checkedMessage = checkMessage();

    if (checkedMessage.status === "error") {
      return setError(
        ErrorMessage(checkedMessage.message, () => setError(null))
      );
    }

    dispatch(sendReaction(textCode, "text", message));
  };

  const checkMessage = () => {
    const maxLength = 280;

    if (message === null || message.trim() === "") {
      return {
        status: "error",
        message: "Het bericht mag niet leeg zijn!",
      };
    }

    if (message.length > maxLength) {
      return {
        status: "error",
        message: `Het bericht mag maximaal ${maxLength} karakters lang zijn.`,
      };
    }

    return true;
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light mt-4 mb-4">
        <div className="row mb-3">
          <div className="col-5 text-start" id="video-reaction-switch">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/receiver/video-reaction/` + textCode)}
            >
              Videoreactie versturen&nbsp;
              <CameraVideo />
            </button>
          </div>
        </div>
        <div className="row">
          <h1 id="text-reaction-title">Tekstreactie verzenden</h1>
        </div>
        <p>Type in het tekstvak hieronder je reactie.</p>
        <div className="row my-4 px-5">
          <textarea
            id="textfield-reaction"
            rows="8"
            cols="30"
            placeholder="Schrijf hier uw bericht"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="row mt-5 mb-3">
          <div className="col-6 text-start">
            <button
              className="btn btn-primary"
              onClick={() =>
                console.log("TODO: via redux state path teruggaan")
              }
            >
              {<LeftArrow />}&nbsp; Bekijk video opnieuw
            </button>
          </div>
          <div className="col-6 text-end" id="send-text-message">
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

export default TextReactionPage;
