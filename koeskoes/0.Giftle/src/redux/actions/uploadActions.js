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

  console.log(mailInfo);
  return {
    type: "setReaction",
    payload: mailInfo,
  };
};

export const sendReaction = (textCode, message) => {
  return async (dispatch) => {
    const mailInfo = await axios.post(
      `http://localhost:4000/api/mails/reaction/text/${textCode}`,
      { message: message }
    );

    if (mailInfo.data.status === 'success') {
      dispatch(setReaction(mailInfo.data));
    }
  };
};