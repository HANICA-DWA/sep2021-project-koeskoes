import React, { useState, useEffect, useParams } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";

function SendTextReactionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState();

  const saveMessageData = () => {
    const checkedMessage = checkMessage();

    if (checkedMessage.status === "error") {
      return setError(ErrorMessage(checkedMessage.message, () => setError(null)));
    }

    // const formData = new FormData();

    // formData.append("textReaction", message);

    // const updateMessage = await axios.patch(
    //   `http://localhost:4000/api/`,
    //   formData
    // );

    // if (updateMessage.data.status === "error") {
    //   return setError(
    //     ErrorMessage(updateMessage.data.message, () => setError(null))
    //   );
    // } else {
    //   return navigate("/receiver");
    // }

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
        <div className="row">
          <h1>Tekstreactie verzenden</h1>
        </div>
        <p>Om een tekstreactie te versturen vult u het tekstvakje hieronder in.</p>           
        <div className="row my-4">
          <h5 className="text-start" htmlFor="textReply">Schrijf hieronder uw bericht.</h5>
          <textarea rows="8" cols="30" placeholder="Schrijf hier uw bericht" onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button className="btn btn-primary" onClick={() => saveMessageData()}>
          Versturen
        </button>
      </div>
    </div>
  );

}

export default SendTextReactionPage;