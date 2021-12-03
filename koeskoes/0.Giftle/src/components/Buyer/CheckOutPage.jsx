import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import ErrorMessage from "../Common/CreateErrorMessage";

/**
 *  This is a temp page for simulating the checkout page
 * @returns the front end of the checkout page
 */

function CheckOutPage() {
  // Hook variables
  const [nameBuyer, setNameBuyer] = useState(null);
  const [emailBuyer, setEmailBuyer] = useState(null);
  const [isNextPage, setIsNextPage] = useState(false);
  const [error, setError] = useState(null);

  if (isNextPage === true) {
    return <Navigate to="/checked-out" />;
  }

  /**
   *
   * This function will send the data of the receiver to the server.
   *
   */
  const saveReceiverData = async () => {
    const checkedName = checkName();
    const checkedEmail = checkEmail();

    if (checkedName.status === "error") {
      return setError(ErrorMessage(checkedName.message, () => setError(null)));
    }

    if (checkedEmail.status === "error") {
      return setError(ErrorMessage(checkedEmail.message, () => setError(null)));
    }

    const formData = new FormData();

    formData.append("nameBuyer", nameBuyer.trim());
    formData.append("emailBuyer", emailBuyer);

    const uploadResponse = await axios.post(
      `http://localhost:4000/orders/newOrder`,
      formData
    );

    if (uploadResponse.data.status === "error") {
      return setError(
        ErrorMessage(uploadResponse.data.message, () => setError(null))
      );
    } else {
      return setIsNextPage(true);
    }
  };

  /**
   *
   * This function will check if the given name isn't too long and only exists of letters and spaces.
   *
   */
  const checkName = () => {
    const maxLength = 300;
    const re = /^[a-zA-Z\s]+$/;

    if (nameBuyer === null || nameBuyer === "") {
      return {
        status: "error",
        message: "De naam moet ingevuld worden!",
      };
    }

    if (nameBuyer.length > maxLength) {
      return {
        status: "error",
        message:
          "De naam die je hebt ingevuld is te lang! De naam mag maximaal 300 karakters lang zijn.",
      };
    }

    if (!re.test(nameBuyer)) {
      return {
        status: "error",
        message:
          "De naam die je hebt ingevuld bevat speciale karakters. Gebruik alleen letters (en spaties).",
      };
    }

    return true;
  };

  /**
   *
   * This function will check if the given e-mail is of the right e-mail format.
   *
   */
  const checkEmail = () => {
    const re = /\S+@\S+\.\S+/;

    if (emailBuyer === null && emailBuyer === "") {
      return {
        status: "error",
        message: "Vul een e-mailadres in",
      };
    }

    if (!re.test(emailBuyer)) {
      return {
        status: "error",
        message: "Vul een geldig e-mailadres in",
      };
    }

    return true;
  };

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <div className="row"></div>
        <div className="row">
          <h1>Gegevens invullen</h1>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-lg-8 col-md-8 col-sm-8">
            <br />
            <label htmlFor="nameBuyer" className="form-label">
              Naam van de koper
            </label>
            <input
              type="name"
              className="form-control"
              id="nameBuyer"
              name="nameBuyer"
              onChange={(e) => setNameBuyer(e.target.value)}
            />
            <br />
            <label htmlFor="emailBuyer" className="form-label">
              E-mailadres van de koper
            </label>
            <input
              type="email"
              className="form-control"
              id="emailBuyer"
              name="emailBuyer"
              onChange={(e) => setEmailBuyer(e.target.value)}
            />
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
        </div>
        <br />
        <br />
        <button
          className="btn btn-primary my-3 mx-4"
          onClick={saveReceiverData}
        >
          Invoeren
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;
