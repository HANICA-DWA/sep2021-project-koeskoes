import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import video from '../../videos/fh5.mp4';
// import { useParams } from "react-router-dom";

function VideoPage() {
  // const { textcode } = useParams();
  const [isVideoTime, setIsVideoTime] = useState(null);
  const [isVideoWatchedTime, setIsVideoWatchedTime] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [videoState, setVideoState] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMinutes(Math.floor(isVideoWatchedTime / 60));
    setSeconds(Math.floor(isVideoWatchedTime) - Math.floor(isVideoWatchedTime / 60) * 60);

    setProgressBar(
      <div className="progress">
        <div title='Tijd' className="progress-bar" role="progressbar" aria-valuenow='1' style={{width: (100 / isVideoTime * isVideoWatchedTime) + '%'}} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    );
  }, [isVideoTime, isVideoWatchedTime]);

  const videoPlayButton = (state) => {
    switch (state) {
      case 1:
        return <button className="btn btn-primary my-3 mx-4" onClick={() => setVideoState(2)}>Afspelen</button>;
      case 2:
        return <button className="btn btn-primary my-3 mx-4" onClick={() => setVideoState(1)}>Pauzeren</button>;
      case 3:
        return <button className="btn btn-primary my-3 mx-4" onClick={() => setVideoState(2)}>Opnieuw afspelen</button>;
      default:
        return null;
    }
  }

  const reactPlayer = () => {
    return (
      <>
        {progressBar}
        <div>{(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : (seconds === 60 ? '00' : seconds))}</div>
        {/* <br /> */}
        <button className="btn btn-primary my-3 mx-4">Vorige stap</button>
        {videoPlayButton(videoState)}
        <button className="btn btn-primary my-3 mx-4">Volgende stap</button>
      </>
    );
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h2>Videoboodschap voor voornaam</h2>
        <ReactPlayer url={video} controls width="100%" height="100%" playing={(videoState === 2 ? true : false)} progressInterval="100" onReady={() => setIsLoading(false)} onEnded={() => setVideoState(3)} onDuration={(time) => setIsVideoTime(time)} onProgress={({playedSeconds}) => setIsVideoWatchedTime(playedSeconds)} />
        {
          (
            isLoading
              ? (
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                )
              : (
                  reactPlayer()
                )
          )
        }
        <hr />
        <div className="text-start">
          <h3>Afzender:</h3>
          <h5>Voornaam Achternaam</h5>
          <h5>voornaamachternaam@mail.nl</h5>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
