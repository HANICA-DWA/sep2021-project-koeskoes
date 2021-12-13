const initialUploadState = {
  videoCreationPath: '',
  uploadVisualState: 1, // 1 is recording/uploading, 2 is rewatching the video
  videoUploaded: false,
  personalized: false,
};

export function uploadReducer(state = initialUploadState, action) {
  switch (action.type) {
    case "setVideoCreationPath":
      return {
        ...state,
        videoCreationPath: action.payload,
      };

    case "setVideoUploaded":
      return {
        ...state,
        videoUploaded: true,
      };

    case "setPersonalized":
      return {
        ...state,
        personalized: true,
      };

    case "changeUploadVisualState":
      return {
        ...state,
        uploadVisualState: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
