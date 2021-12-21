import axios from 'axios';

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

export const setReaction = (mailInfo) => {
  return {
    type: "setReaction",
    payload: mailInfo,
  };
};

export const sendReaction = (textCode, type, message) => {
  return async (dispatch) => {
    const mailInfo = await axios.post(
      `http://localhost:4000/api/mails/reaction/${type}/${textCode}`,
      { message: message }
    );

    if (mailInfo.data.status === 'success') {
      dispatch(setReaction(mailInfo.data));
      await axios.patch(
        `http://localhost:4000/api/mails/reaction/sent/${textCode}`
      );
    }
  };
};