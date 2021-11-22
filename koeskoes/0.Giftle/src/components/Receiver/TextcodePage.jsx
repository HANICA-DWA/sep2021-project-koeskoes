import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getVideo, resetVideo } from "../../redux/actions/videoActions";
import ErrorMessage from "../Common/CreateErrorMessage";
import BackArrow from "../Common/BackArrowIcon";

const TextcodePage = () => {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.videos.video || null);

  const [givenTextcode, setGivenTextcode] = useState(null);
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(null);
  const [isGoBackReceiverMain, setIsGoBackReceiverMain] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (video) {
      if (!video._id) {
        dispatch(resetVideo());
        return setError(
          ErrorMessage("Geen geldige tekstcode!", () => setError(null))
        );
      }

      setIsGoToWatchVideo(video._id);
    }
  }, [video, dispatch]);

  /**
   *
   * This function will redirect the user to the video page.
   * If the textcode isn't recognized or if the textcode field is empty, an error will be displayed.
   *
   */
  const checkTextcode = () => {
    if (givenTextcode === null || givenTextcode === "") {
      return setError(
        ErrorMessage("Voer een tekstcode in!", () => setError(null))
      );
    } else {
      dispatch(getVideo(givenTextcode));
    }
  };

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isGoToWatchVideo !== null) {
    return <Navigate to={"/watchvideo/" + isGoToWatchVideo} />;
  }

  if (isGoBackReceiverMain === true) {
    return <Navigate to="/receiver" />;
  }

  return (
    <div className="vertical-center colored-background">
      {error}
      <div className="container text-center rounded p-3 bg-light">
        <h1 className="my-2">Tekstcode invullen</h1>
        <p className="mt-4">
          Vul hieronder de door u ontvangen tekstcode in om de video te kunnen
          bekijken.
        </p>
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2"></div>
          <div className="col-lg-8 col-md-8 col-sm-8">
            <input
              type="textcode"
              class="form-control"
              id="givenTextcode"
              name="givenTextcode"
              onChange={(e) => setGivenTextcode(e.target.value)}
            />
            <p>{givenTextcode}</p>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2"></div>
        <button
          className="btn btn-primary my-3 mx-4"
          onClick={() => setIsGoBackReceiverMain(true)}
        >
          {<BackArrow />}
          Terug
        </button>
        <button
          className="btn btn-primary my-3 mx-4"
          onClick={() => checkTextcode()}
        >
          Bekijk video
        </button>
      </div>
    </div>
  );
};

export default TextcodePage;
