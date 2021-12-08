const initialVideoState = {
  video: "",
  watched: false,
};

export function videoReducer(state = initialVideoState, action) {
  switch (action.type) {
    case "setVideo":
      return {
        ...state,
        video: action.payload,
      };

    case "resetVideo":
      return {
        ...state,
        video: "",
      };

    case "setVideoWatched":
      return {
        ...state,
        watched: true,
      };

    default:
      return {
        ...state,
      };
  }
}
