import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import BackArrow from "../Common/BackArrowIcon";
import QrReader from "react-qr-reader";
import ErrorMessage from "../Common/CreateErrorMessage";
import "../../styles/receiver/ScanQRPage.css";

/**
 * Functional component for scanning the QR-code
 *
 * @return the front-end for the scanning page
 */
function ScanQRPage() {
  // Creates the state for delay, style and errors that can occur for the QR-scanner.

  const [delay] = useState(100);
  const [previewStyle] = useState({ height: "17em", width: "17em" });
  const [isDevicesChecked, setIsDevicesChecked] = useState(false);
  const [isGoBackBuyerMain, setIsGoBackBuyerMain] = useState(false);
  const [error, setError] = useState(null);

  /**
   *
   * UseEffect to check if  video is available for the webcam module.
   *
   */
  useEffect(() => {
    const checkCamera = async () => {
      try {
        const videoAccess = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoAccess.getVideoTracks().length < 1) {
          setError(ErrorMessage("Geen webcam gevonden", () => setError(null)));
        }
      } catch (e) {
        setError(ErrorMessage("Geen webcam gevonden", () => setError(null)));
      }
      setIsDevicesChecked(true);
    };
    if (isDevicesChecked !== true) {
      checkCamera();
    }
  });

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isGoBackBuyerMain === true) {
    return <Navigate to="/qr-code" />;
  }

  return (
    <div className="vertical-center colored-background">
      <div className="errorBox">{error}</div>
      <div className="mainBox container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        <div className="scanContainer">
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={ErrorMessage(
              "Fout met de camera of het scannen!",
              () => setError(null)
            )}
            onScan={(data) => {
              if (data) {
                if (!data.includes("localhost")) {
                  setError(
                    ErrorMessage(
                      "De QR-code verwijst niet naar deze site!",
                      () => setError(null)
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
            onClick={() => setIsGoBackBuyerMain(true)}
          >
            {<BackArrow />}
            Terug
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanQRPage;
