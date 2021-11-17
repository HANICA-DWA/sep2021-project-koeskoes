import React, { useState } from "react";

function RecordVideo() {
  const [error, setError] = useState(null);
  let [recording, setRecording] = useState("START_RECORDING");

  const nextStep = () => {
    if (recording === "STOP_RECORDING") {
      return (
        <button
          className="btn btn-primary ms-3"
          onClick={() => {
            setRecording("NEXT_STEP");
          }}
        >
          Volgende stap
        </button>
      );
    } else {
      return null;
    }
  };

  const renderHTML = (text, action) => {
    return (
      <div className="vertical-center colored-background">
        {error}
        <div className="container text-center rounded p-3 bg-light">
          <h1>Uw video opnemen</h1>
          <br />
          <p>Hier komt het opnemen van een video...</p>
          <p>Resolutie: 720p</p>
          <p>
            Door een video op te nemen gaat u akkoord met de{" "}
            <a href="#algemene-voorwaarden">algemene voorwaarden</a>.
          </p>
          <br />
          <button
            className="btn btn-primary me-3"
            onClick={() => {
              setRecording(action);
            }}
          >
            {text}
          </button>
          {nextStep()}
        </div>
      </div>
    );
  };

  const recordVideoSteps = () => {
    switch (recording) {
      case "START_RECORDING":
        return renderHTML("Opnemen starten", "RECORDING");
      case "RECORDING":
        return renderHTML("Opnemen stoppen", "STOP_RECORDING");
      case "STOP_RECORDING":
        return renderHTML("Opnieuw opnemen", "START_RECORDING");
      case "NEXT_STEP":
        return "Feature voor andere use case.";
    }
  };

  return recordVideoSteps();
}

export default RecordVideo;
