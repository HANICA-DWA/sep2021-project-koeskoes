import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";

/**
 * A page that checks if order has a video
 * @returns the front end of the ControlOrder page
 */

function ControlOrder() {
  // TODO: De parameter textCode moet in de Redux State en textCode niet meegeven in URL!
  const { textCode } = useParams();
  const [videoExistsInOrder, setVideoExistsInOrder] = useState(true);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const getVideoInOrder = async () => {
      const videoExists = await axios.get(
        "http://localhost:4000/videos/" + textCode
      );

      if (!videoExists.data.status) {
        setOrderData(videoExists.data);
      } else {
        setOrderData(null);
      }
    };

    getVideoInOrder();
  }, [textCode]);

  const videoInOrderExists = () => {
    if (orderData.videoName === "") {
      return <Navigate to={`/buyer`} />;
    }
    return (
      <div className="vertical-center colored-background">
        <div className="container text-center rounded p-3 bg-light">
          <h2>
            Er is al een video geupload of opgenomen die in de bestelling staat.
          </h2>
          <p>
            Uw bestellingsnummer is:{" "}
            <b>
              <i>
                <span style={{ fontSize: "1.5em" }}>{textCode}</span>
              </i>
            </b>
          </p>
        </div>
      </div>
    );
  };

  /**
   * Check if order has video. If true show message, if false navigate to /buyer
   * @returns the front end of the ControlOrder page
   */

  return videoInOrderExists();
}

export default ControlOrder;
