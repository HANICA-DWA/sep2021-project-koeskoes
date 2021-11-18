import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import QrReader from "react-qr-reader";
import ErrorMessage from "../Common/CreateErrorMessage";
import "../../styles/receiver/scanQR.css";

/**
 * Functional component for scanning the QR-code
 *
 * @return the front-end for the scanning page
 */

function ScanQR() {
  // Creates the state for delay, style and errors that can occur for the QR-scanner.

  const [delay] = useState(100);
  const [previewStyle] = useState({ height: "17em", width: "17em" });
  const [isGoBackSellerMain, setIsGoBackSellerMain] = useState(false);
  const [error, setError] = useState(null);

  
  if (isGoBackSellerMain === true) {
    return <Navigate to="/qr-code" />;
  }

  /**
   * This function will handle the occuring error
   * IsError will be set to true, which effects the errorBox function
   * After the boolean change, the error will be send to the console.
   *
   * @param err object containing the error that occured.
   */
  const handleError = (err) => {
    setError(
      ErrorMessage("Fout met het de camera of het scannen!", () =>
        setError(null)
      )
    );
    console.log(err);
  };

  return (
    <div className="vertical-center colored-background">
      <div className="errorBox">{error}</div>
      <div className="mainBox container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        <div className="scanContainer">
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={(data) => {
              if (data) {
                if (!data.includes("localhost")) {
                  setError(
                    ErrorMessage("Fout met het de camera of het scannen!", () =>
                      setError(null)
                    )
                  );
                } else {
                  window.location.href = data;
                }
              }
            }}
          />
          <button
            className="btn btn-primary my-3 mx-4"
            onClick={() => setIsGoBackSellerMain(true)}
          >
            Terug
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanQR;
