const initialUploadState = {
  videoPath: '',
  uploadVisualState: 1, // 1 is recording/uploading, 2 is rewatching the video
  videoUploaded: false,
  personalized: false,
};

export function uploadReducer(state = initialUploadState, action) {
  switch (action.type) {
    case "setVideoPath":
      return {
        ...state,
        videoPath: action.payload,
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
