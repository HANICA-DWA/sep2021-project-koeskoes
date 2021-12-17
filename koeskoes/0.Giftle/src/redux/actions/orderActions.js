import axios from 'axios';
import { setVideo } from './videoActions';

export const setTextCode = (textCode) => {
  return {
    type: "setTextCode",
    payload: textCode,
  };
};

export const getVideoInOrder = (textCode) => {
  return async (dispatch) => {
    const videoExists = await axios.get(
      "http://localhost:4000/api/videos/" + textCode
    );
  
    if (!videoExists.data.status) {
      dispatch(setVideo(videoExists.data));
      dispatch(setTextCode(textCode));
    }
  };
};