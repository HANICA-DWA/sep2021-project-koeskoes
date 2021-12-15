import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTextCode } from "../../redux/actions/orderActions";
import axios from "axios";

/**
 * A page that checks if order has a video
 * @returns the front end of the ControlOrder page
 */
function ControlOrderPage() {
  const navigate = useNavigate();
  const { textCode } = useParams();
  const [orderData, setOrderData] = useState({});
  const dispatch = useDispatch();

  /**
   * Useeffect activates when the textCode changes.
   * Converts the textCode in the URL to a textCode in the state.
   */
  useEffect(() => {
    const getVideoInOrder = async () => {
      const videoExists = await axios.get(
        "http://localhost:4000/api/videos/" + textCode
      );

      if (!videoExists.data.status) {
        dispatch(setTextCode(textCode));
        setOrderData(videoExists.data);
      } else {
        setOrderData(null);
      }
    };

    getVideoInOrder();
  }, [textCode, dispatch]);

  /**
   * Check if order has video. If true show message, if false navigate to /buyer
   * @returns the front end of the ControlOrder page
   */
  const videoInOrderExists = () => {
    if (orderData.videoName === "") {
      return navigate("/buyer");
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

  return videoInOrderExists();
}

export default ControlOrderPage;
