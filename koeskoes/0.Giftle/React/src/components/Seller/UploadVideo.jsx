import React from "react";
function UploadVideo() {
  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>Video uploaden!</h1>
        <p>Voor het uploaden van een video moet je hieronder een video selecteren die je wilt meesturen met je cadeau.</p>
        <input type="file" name="uploadedVideo" accept="video/*" /><br /><br />
        <button className="btn btn-primary">Create room</button>
      </div>
    </div>
  );
}

export default UploadVideo;
