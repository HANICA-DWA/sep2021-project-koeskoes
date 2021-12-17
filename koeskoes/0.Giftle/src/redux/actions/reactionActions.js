import axios from "axios";

export const setReactionCreationPath = (reactionCreationPath) => {
  return {
    type: "setReactionCreationPath",
    payload: reactionCreationPath,
  };
};

export const setReactionUploaded = () => {
  return {
    type: "setReactionUploaded",
  };
};

export const changeReactionUploadVisualState = (state) => {
  return {
    type: "changeReactionUploadVisualState",
    payload: state,
  };
};

export const setReaction = (reaction) => {
  return {
    type: "setReaction",
    payload: reaction,
  };
};

export const getReaction = (textCode) => {
  return async (dispatch) => {
    const reaction = await axios.get("http://localhost:4000/api/videos/" + textCode);

    return dispatch(setReaction(reaction.data));
  };
};

export const resetReaction = () => {
  return { type: "resetReaction" };
};