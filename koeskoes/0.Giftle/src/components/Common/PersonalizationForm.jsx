import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "./CreateErrorMessage";
import { useSelector } from "react-redux";

// import SVG as ReactComponent for easier use
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";

/**
 *
 * React component to rewatch a video.
 *
 * @return the front-end for the personalization page
 *
 */
function PersonalizationForm(props) {
  // Creates the state for the order and errors that can occur.
  const [nameReceiver, setNameReceiver] = useState(null);
  const [emailReceiver, setEmailReceiver] = useState(null);
  const textCode = useSelector((state) => state.orders.textCode);

  /**
   * This function will send the data of the receiver to the server.
   */
  const saveReceiverData = async () => {
    const checkedName = checkName();
    const checkedEmail = checkEmail();

    if (checkedName.status === "error") {
      return props.setError
        ? props.setError(
            ErrorMessage(checkedName.message, () => props.setError(null))
          )
        : null;
    }

    if (checkedEmail.status === "error") {
      return props.setError
        ? props.setError(
            ErrorMessage(checkedEmail.message, () => props.setError(null))
          )
        : null;
    }

    const formData = new FormData();

    formData.append("name", nameReceiver.trim());
    formData.append("email", emailReceiver);

    const uploadResponse = await axios.patch(
      `http://localhost:4000/api/orders/new/` + textCode,
      formData
    );

    if (uploadResponse.data.status === "error") {
      return props.setError
        ? props.setError(
            ErrorMessage(uploadResponse.data.message, () =>
              props.setError(null)
            )
          )
        : null;
    } else {
      // return setIsNextPage(true);
      // Do something after adding personalized data.
      if (props.next) props.next();
    }
  };

  /**
   * This function will check if the given name isn't too long and only exists of letters and spaces.
   * @returns true or an object {status, message}
   */
  const checkName = () => {
    const maxLength = 300;

    if (!nameReceiver) {
      return {
        status: "error",
        message: "Je hebt geen naam ingevuld.",
      };
    }

    if (!nameReceiver || nameReceiver.length > maxLength) {
      return {
        status: "error",
        message:
          "De naam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn.",
      };
    }

    return true;
  };

  /**
   * This function will check if the given e-mail is of the right e-mail format.
   * @returns true or an object {status, message}
   */
  const checkEmail = () => {
    const re = /\S+@\S+\.\S+/;

    if (emailReceiver !== null && emailReceiver !== "") {
      if (!re.test(emailReceiver)) {
        return {
          status: "error",
          message: "Vul een geldig e-mailadres in",
        };
      }
    }

    return true;
  };

  return (
    <>
      <div className="row">
        <h1>Video personaliseren</h1>
      </div>
      <p>
        Om de video bij de juiste persoon aan te laten komen, hebben we de naam
        van deze persoon nodig! Ook is het mogelijk om per mail een tekstcode te
        versturen naar de ontvanger. Hiermee kan de video ook geopend en bekeken
        worden. Wil je dit? Vul dan ook zijn/haar mail hieronder in.
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
      <button className="btn btn-primary" onClick={saveReceiverData} disabled={(props.disabled ? props.disabled : false)}>
        Versturen&nbsp;
        <RightArrow />
      </button>
    </>
  );
}

export default PersonalizationForm;
