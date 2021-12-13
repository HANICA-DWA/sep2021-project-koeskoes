import * as Redux from "redux";
import { orderReducer } from './orderReducer';
import { uploadReducer } from "./uploadReducer";
import { videoReducer } from './videoReducer';
import { employeeReducer } from './employeeReducer';

export const mainReducer = Redux.combineReducers({
  orders: orderReducer,
  videos: videoReducer,
  uploads: uploadReducer,
  employee: employeeReducer,
});
