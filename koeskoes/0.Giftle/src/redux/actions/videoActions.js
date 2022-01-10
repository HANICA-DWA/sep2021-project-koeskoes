import axios from "axios";

export const setVideo = (video) => {
  return {
    type: "setVideo",
    payload: video,
  };
};

export const getVideo = (textCode) => {
  return async (dispatch) => {
    const video = await axios.get("http://localhost:4000/api/videos/" + textCode);

    return dispatch(setVideo(video.data));
  };
};

export const setVideoWatched = () => {
  return {
    type: "setVideoWatched"
  };
};

export const setSelectedCamera = (cameraId) => {
  return {
    type: "setSelectedCamera",
    payload: cameraId,
  };
};

export const setSelectedRecordingQuality = (cameraQuality) => {
  return {
    type: "setSelectedRecordingQuality",
    payload: cameraQuality,
  };
};

export const sendVideoWatchedMail = (textCode) => {
  return (dispatch) => {
    axios.post(`http://localhost:4000/api/mails/notification/video/${textCode}/watched`);

    return dispatch(setVideoWatched());
  };
};

export const resetVideo = () => {
  return { type: "resetVideo" };
};
