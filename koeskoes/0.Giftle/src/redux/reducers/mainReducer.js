import * as Redux from "redux";
import { orderReducer } from './orderReducer';
import { videoReducer } from './videoReducer';

export const mainReducer = Redux.combineReducers({
  orders: orderReducer,
  videos: videoReducer
});
