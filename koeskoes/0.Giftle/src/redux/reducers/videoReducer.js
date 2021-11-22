const initialVideoState = {
  video: "",
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

    default:
      return {
        ...state,
      };
  }
}
