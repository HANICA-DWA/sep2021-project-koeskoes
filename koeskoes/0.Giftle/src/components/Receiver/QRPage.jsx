import React from "react";
import { Navigate } from "react-router";
import { useState } from "react";
import BackArrow from "../Common/BackArrowIcon";

/**
 * Functional component for letting the user know that they are about to scan a QR-code
 *
 * @return the front-end for the QR page
 */

function QRPage() {
  // Creates the state for checking if the button is clicked.
  // Flips to true if clicked and then navigates to the corresponding url/ component

  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [isGoBackReceiverMain, setIsGoBackReceiverMain] = useState(false);

  if (isBtnClicked === true) {
    return <Navigate to="/scan" />;
  }

  if (isGoBackReceiverMain === true) {
    return <Navigate to="/receiver" />;
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        <p className="mt-4">
          U kunt de QR-code scannen door op de knop hieronder te klikken.
        </p>
        <button
          className="btn btn-primary my-3 mx-4"
          onClick={() => setIsGoBackReceiverMain(true)}
        >
          {<BackArrow />}
          Terug
        </button>
        <button
          className="btn btn-primary my-3 mx-4"
          onClick={() => setIsBtnClicked(true)}
        >
          Scan QR-code
        </button>
      </div>
    </div>
  );
}

export default QRPage;
