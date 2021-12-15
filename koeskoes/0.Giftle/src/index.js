import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";

import * as Redux from "redux";
import { Provider } from "react-redux";
import { mainReducer } from "./redux/reducers/mainReducer";
import thunkMiddleware from "redux-thunk";

const logger = (store) => (next) => (action) => {
  let result = next(action);
  return result;
};

export const theStore = Redux.createStore(
  mainReducer,
  Redux.compose(Redux.applyMiddleware(logger, thunkMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

const mainComponent = (
  <Provider store={theStore}>
    <App />
  </Provider>
);

ReactDOM.render(mainComponent, document.getElementById("root"));
