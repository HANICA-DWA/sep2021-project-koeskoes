import React from "react";
import { Navigate } from "react-router";
import { useState } from "react";
import QrReader from "react-qr-reader";

function ScanQR() {
  const [delay] = useState(100);
  const [previewStyle] = useState({ height: 240, width: 320 });

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={(data) => {
            if (data) {
              console.log(data);
              window.open(data);
            }
          }}
        />
      </div>
    </div>
  );
}

export default ScanQR;
