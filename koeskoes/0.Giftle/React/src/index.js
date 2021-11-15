import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.css";

import * as Redux from "redux";
import { mainReducer } from "./redux/reducers/mainReducer";
import thunkMiddleware from "redux-thunk";
import App from "./components/App";

const logger = (store) => (next) => (action) => {
  let result = next(action);
  return result;
};

export const theStore = Redux.createStore(
  mainReducer,
  Redux.compose(Redux.applyMiddleware(logger, thunkMiddleware))
);

const mainComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(mainComponent, document.getElementById("root"));
