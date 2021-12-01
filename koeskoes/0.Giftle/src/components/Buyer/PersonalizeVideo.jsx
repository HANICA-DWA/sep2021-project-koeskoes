import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";

function PersonalizeVideo() {
  const { textCode } = useParams();
  const [nameReceiver, setNameReceiver] = useState(null);
  const [emailReceiver, setEmailReceiver] = useState(null);
  const [isPreviousPage, setIsPreviousPage] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [error, setError] = useState(null);

  if (isPreviousPage === true) {
    return <Navigate to={`/rewatchvideo/` + textCode} />;
  }

  if (isNextPage === true) {
    return <Navigate to="/thankyou" />;
  }

  const saveReceiverData = async () => {
    if (validateEmail()) {
      const formData = new FormData();

      formData.append("name", nameReceiver);
      formData.append("email", emailReceiver);

      const uploadResponse = await axios.patch(
        `http://localhost:4000/orders/new/` + textCode,
        formData
      );

      if (uploadResponse.data.status === "error") {
        return setError(
          ErrorMessage(uploadResponse.data.message, () => setError(null))
        );
      } else {
        return setIsNextPage(true);
      }
    } else {
      return setError(
        ErrorMessage("Vul een geldig e-mailadres in", () => setError(null))
      );
    }
  };

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;

    console.log(emailReceiver);

    if (emailReceiver !== null && emailReceiver !== "") {
      return re.test(emailReceiver);
    } else {
      return true;
    }
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <button
              className="btn btn-primary float-start"
              onClick={() => setIsPreviousPage(true)}
            >
              {<BackArrow />}
              Terug
            </button>
          </div>
        </div>
        <div className="row">
          <h1>Video personaliseren</h1>
        </div>
        <p>
          Om de video bij de juiste persoon aan te laten komen, hebben we de
          naam van deze persoon nodig! Ook is het mogelijk om per mail een
          tekstcode te versturen naar de ontvanger. Hiermee kan de video ook
          geopend en bekeken worden. Wil je dit? Vul dan ook zijn/haar mail
          hieronder in.
        </p>

        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-lg-8 col-md-8 col-sm-8">
            <br />
            <label htmlFor="nameReceiver" className="form-label">
              Naam van de ontvanger
            </label>
            <input
              type="name"
              className="form-control"
              id="nameReceiver"
              name="nameReceiver"
              onChange={(e) => setNameReceiver(e.target.value)}
            />
            <br />
            <label htmlFor="emailReceiver" className="form-label">
              E-mailadres van de ontvanger
            </label>
            <input
              type="email"
              className="form-control"
              id="emailReceiver"
              name="emailReceiver"
              onChange={(e) => setEmailReceiver(e.target.value)}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
        </div>
        <br />
        <br />
        <button className="btn btn-primary" onClick={saveReceiverData}>
          Volgende stap
        </button>
      </div>
    </div>
  );
}

export default PersonalizeVideo;
