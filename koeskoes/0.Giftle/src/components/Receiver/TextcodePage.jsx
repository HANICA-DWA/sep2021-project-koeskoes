import React, { UseState } from "react";

function TextcodePage() {
  const [isGoToWatchVideo, setIsGoToWatchVideo] = useState(null);

  /**
   *
   * Event to navigate to different page.
   *
   */
  if (isGoToWatchVideo === true) {
    return <Navigate to="/watchvideo" />;
  }

  return (
    <div className="vertical-center colored-background">
      <div className="container text-center rounded p-3 bg-light">
        <h1>HEY</h1>
      </div>
    </div>
  );
}

export default TextcodePage;
