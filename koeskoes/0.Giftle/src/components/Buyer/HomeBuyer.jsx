import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function HomeBuyer() {
  // Creates the state for checking if the corresponding button has been clicked
  // Flips to true if clicked and then navigates to the corresponding url/ component

  const [isBtnRecord, setIsBtnRecord] = useState(false);
  const [isBtnUpload, setIsBtnUpload] = useState(false);

  if (isBtnRecord === true) {
    return <Navigate to="/record" />;
  }

  if (isBtnUpload === true) {
    return <Navigate to="/upload" />;
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
          Opnemen
        </button>
        <button
          className="btn btn-primary mx-4"
          onClick={() => setIsBtnUpload(true)}
        >
          Uploaden
        </button>
      </div>
    </div>
  );
}

export default HomeBuyer;
