export const setVideoPath = (videoPath) => {
  return {
    type: "setVideoPath",
    payload: videoPath,
  };
};

export const setVideoUploaded = () => {
  return {
    type: "setVideoUploaded",
  };
};

export const setPersonalized = () => {
  return {
    type: "setPersonalized",
  };
};

export const changeUploadVisualState = (state) => {
  return {
    type: "changeUploadVisualState",
    payload: state,
  };
};
