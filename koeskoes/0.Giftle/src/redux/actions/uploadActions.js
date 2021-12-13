export const setVideoCreationPath = (videoCreationPath) => {
  return {
    type: "setVideoCreationPath",
    payload: videoCreationPath,
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
