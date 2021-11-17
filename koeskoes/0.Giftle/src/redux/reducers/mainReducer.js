import * as Redux from "redux";
import { orderReducer } from './orderReducer';

export const mainReducer = Redux.combineReducers({
  orders: orderReducer
});
