import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../Common/CreateMessage";

import { sendReaction } from "../../redux/actions/uploadActions";
import { getVideoInOrder } from "../../redux/actions/orderActions";

// import SVG as ReactComponent for easier use
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";

function TextReactionPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();
  const reaction = useSelector((state) => state.uploads.reaction);
  const video = useSelector((state) => state.videos.video);

  /**
   * Useeffect activates when the textCode changes.
   * Converts the textCode in the URL to a textCode in the state.
   */
  useEffect(() => {
    dispatch(getVideoInOrder(textCode));
  }, [textCode, dispatch]);

  /**
   * This useEffect activates when a reaction is already sent.
   * If no reaction has been uploaded yet, the user stays on the current page.
   */
  useEffect(() => {
    if (video.answerSent) {
      navigate("/receiver/reaction-sent");
    }
  }, [video]);

  /**
   * This useEffect activates when the e-mail has been succesfully sent.
   * If something goes wrong, the user stays on the current page.
   */
  useEffect(() => {
    if (reaction.status === "success") {
      navigate("/receiver/reaction-sent");
    }
  }, [reaction]);

  /**
   * This async function dispatches sendReaction with the checked message, which sends the e-mail to the buyer.
   */
  const saveMessageData = async () => {
    const checkedMessage = checkMessage();

    if (checkedMessage.status === "error") {
      return setError(Message(checkedMessage.message, () => setError(null)));
    }

    dispatch(sendReaction(textCode, "text", message));
  };

  /**
   * This function checks the userinput (message) and returns true if the message is okay.
   */
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
            <div className="form-switch-alignment">
              <div className="form-control-lg form-check form-switch border border-primary">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => {
                    navigate(`/receiver/video-reaction/` + textCode);
                  }}
                  checked
                />
                <h6 className="switch-text">&nbsp;Videoreactie versturen</h6>
              </div>
            </div>
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
              onClick={() => navigate(`/receiver/watchvideo/` + textCode)}
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
