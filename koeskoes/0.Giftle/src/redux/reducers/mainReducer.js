import * as Redux from "redux";
import { orderReducer } from './orderReducer';
import { uploadReducer } from "./uploadReducer";
import { videoReducer } from './videoReducer';

export const mainReducer = Redux.combineReducers({
  orders: orderReducer,
  videos: videoReducer,
  uploads: uploadReducer,
});
