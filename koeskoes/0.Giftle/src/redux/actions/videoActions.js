import axios from "axios";

export const setVideo = (video) => {
  return {
    type: "setVideo",
    payload: video,
  };
};

export const getVideo = (textCode) => {
  return async (dispatch) => {
    const video = await axios.get("http://localhost:4000/videos/" + textCode);

    return dispatch(setVideo(video.data));
  };
};

export const resetVideo = () => {
  return { type: "resetVideo" };
};
