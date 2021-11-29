import React from "react";
import ReactPlayer from 'react-player/lazy';
import video from '../../videos/fh5.mp4';
// import { useParams } from "react-router-dom";

function VideoPage() {
  // const { textcode } = useParams();

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Uw videoboodschap!</h1>
        <ReactPlayer url={video} controls width="100%" />
      </div>
    </div>
  );
}

export default VideoPage;
