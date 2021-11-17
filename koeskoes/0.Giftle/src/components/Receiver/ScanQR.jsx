import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import QrReader from "react-qr-reader";
import "../../styles/receiver/scanQR.css";

function ScanQR() {
  const [delay] = useState(100);
  const [previewStyle] = useState({ height: `17em`, width: `17em` });
  const [isError, setIsError] = useState(false);

  const handleError = (err) => {
    setIsError(true);
    console.error(err);
  };

  const errorBox = () => {
    if (isError) {
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        Fout met het de camera of het scannen!
      </div>;
      console.log("ERROR");
    }
  };

  return (
    <div className="vertical-center colored-background">
      <div className="mainBox container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        {errorBox()}
        <div className="scanContainer">
          <QrReader
            delay={delay}
            style={previewStyle}
            onError={handleError}
            onScan={(data) => {
              if (data) {
                console.log(data);
                window.location.href = data;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ScanQR;
