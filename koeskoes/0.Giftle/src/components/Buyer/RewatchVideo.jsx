import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Navigate } from "react-router";
import BackArrow from "../Common/BackArrowIcon";
import NextArrow from "../Common/NextArrowIcon";

function RewatchVideo() {
  const [isPreviousPage, setIsPreviousPage] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);

  /**
   *
   * Events to navigate to different pages.
   *
   */
  if (isPreviousPage === true) {
    return <Navigate to="/buyer" />;
  }
  if (isNextPage === true) {
    return <Navigate to="/personalize" />; // Deze moet nog naar volgende stap!
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <div class="row">
          <div class="col-12">
            <h2>Video terugkijken</h2>
            <p>
              Hier kan je jouw video terugkijken voordat je deze opstuurt naar
              de ontvanger. Zo weet je zeker dat jouw video perfect is.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 video-player">
            <ReactPlayer
              url={
                "https://www.youtube.com/watch?v=0e3GPea1Tyg&ab_channel=MrBeast"
              }
              width="100%"
              height="100%"
              controls={true}
              playing={false}
              progressInterval={100}
            />
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <button
              className="btn btn-secondary"
              onClick={() => setIsPreviousPage(true)}
            >
              {<BackArrow />}&nbsp;Vorige stap
            </button>
          </div>
          <div class="col-6">
            <button
              className="btn btn-secondary"
              onClick={() => setIsNextPage(true)}
            >
              Volgende stap&nbsp;
              {<NextArrow />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewatchVideo;
