import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// import SVG as ReactComponent for easier use
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import { ReactComponent as PencilSquare } from "../../assets/pencil-square.svg";

function VideoReactionPage() {
  const { textCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveMessageData = () => {
    return null;
  };

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light mt-4 mb-4">
        <div className="row mb-4">
          <div className="col-5 text-start">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/receiver/text-reaction/` + textCode)}
            >
              Tekstreactie versturen&nbsp;
              <PencilSquare />
            </button>
          </div>
        </div>
        <div className="row">
          <h1>Videoreactie verzenden</h1>
        </div>
        <p className="px-3">
          Om een videoreactie te versturen klik je op de knop "opnemen" of
          upload je een video.
        </p>
        <div className="row mt-4 mb-5 text-danger">
          Hier komen de componenten vanuit CreateVideoPage van
          /Buyer/CreateVideoPage.jsx
        </div>
        <div className="row mt-5 mb-3">
          <div className="col-6 text-start">
            <button
              className="btn btn-primary"
              onClick={() =>
                console.log("TODO: via redux state path teruggaan")
              }
            >
              {<LeftArrow />}&nbsp; Bekijk video opnieuw
            </button>
          </div>
          <div className="col-6 text-end">
            <button
              className="btn btn-primary"
              onClick={() => saveMessageData()}
            >
              Versturen&nbsp;
              {<RightArrow />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoReactionPage;

// <button onclick="">Go Back</button>
