import React from "react";
import { Navigate } from "react-router";
import { useState } from "react";

function QRPage() {
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  if (isBtnClicked === true) {
    return <Navigate to="/scan" />;
  }
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1 className="my-2">Scan uw QR-code</h1>
        <p className="mt-4">
          U kunt de QR-code scannen door op de knop hieronder te klikken.
        </p>
        <button
          className="btn btn-primary my-3"
          onClick={() => setIsBtnClicked(true)}
        >
          Scan QR-code
        </button>
      </div>
    </div>
  );
}

export default QRPage;
