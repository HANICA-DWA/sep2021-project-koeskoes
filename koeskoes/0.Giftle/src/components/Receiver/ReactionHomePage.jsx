import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// import SVG as ReactComponent for easier use
import { ReactComponent as PencilSquare } from "../../assets/pencil-square.svg";
import { ReactComponent as CameraVideo } from "../../assets/camera-video.svg";

/**
 * Functional component start the watch video proces.
 *
 * @return the front-end for the receiver homepage.
 */
function ReactionHomePage() {
  const { textCode } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if () {
  //     return navigate("/receiver/reaction-sent");
  //   }
  // }, [, navigate]);

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Jouw keuze om een reactie te geven</h1>
        <p>
          Om degene die jou de Giftle heeft gestuurd te kunnen bedanken, kies je
          hieronder tussen een tekstreactie of videoreactie. Het is niet
          verplicht om een reactie te geven.
        </p>
        <button
          className="btn btn-primary mx-2 text-reaction-button"
          onClick={() => navigate(`/receiver/text-reaction/` + textCode)}
        >
          Tekstreactie&nbsp;
          <PencilSquare />
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            return navigate(`/receiver/video-reaction/` + textCode);
          }}
        >
          Videoreactie&nbsp;
          <CameraVideo />
        </button>
      </div>
    </div>
  );
}

export default ReactionHomePage;
