import React from "react";
import { useNavigate } from "react-router-dom";

// import SVG as ReactComponent for easier use
import { ReactComponent as PencilSquare } from "../../assets/pencil-square.svg";
import { ReactComponent as CameraVideo } from "../../assets/camera-video.svg";

/**
 * Functional component start the watch video proces.
 *
 * @return the front-end for the receiver homepage.
 */
function ReactionHomePage() {
  const navigate = useNavigate();

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Uw keuze om een reactie te geven</h1>
        <p>
          Om de Giftle gever te kunnen bedanken kiest u tussen een tekstreactie of videoreactie te versturen.
        </p>
        {/* <Link to="/qr-code" className="btn btn-primary mx-2">
          QR-code
        </Link> */}
        <button
          className="btn btn-primary mx-2"
          onClick={() => navigate("/receiver/text-reaction")}
        >
          Tekstreactie&nbsp;
          <PencilSquare />
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => navigate("/receiver/video-reaction")}
        >
          Videoreactie&nbsp;
          <CameraVideo />
        </button>
      </div>
    </div>
  );
}

export default ReactionHomePage;
