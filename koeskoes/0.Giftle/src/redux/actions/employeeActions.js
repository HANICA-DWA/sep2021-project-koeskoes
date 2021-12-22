import axios from "axios";

export const setOrders = (orders) => {
  return {
    type: "setOrders",
    payload: orders,
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    const orders = await axios.get("http://localhost:4000/api/orders/all/?printed=false");

    return dispatch(setOrders(orders.data));
  };
};

export const setReceived = (orders) => {
  return {
    type: "setReceived",
    payload: orders,
  };
};

export const getReceived = () => {
  return async (dispatch) => {
    const orders = await axios.get("http://localhost:4000/api/orders/all/?printed=true&textcodeSent=false");

    return dispatch(setReceived(orders.data));
  };
};

export const setSearch = (search) => {
  return {
    type: "setSearch",
    payload: search,
  };
};

export const setOrderPageNumber = (orderPageNumber) => {
  return {
    type: "setOrderPageNumber",
    payload: orderPageNumber,
  };
};

export const setOrderPageNumbers = (orderPageNumbers) => {
  return {
    type: "setPageNumbers",
    payload: orderPageNumbers,
  };
};

export const setReceivedPageNumber = (receivedPageNumber) => {
  return {
    type: "setPageNumber",
    payload: receivedPageNumber,
  };
};

export const setReceivedPageNumbers = (receivedPageNumbers) => {
  return {
    type: "setPageNumbers",
    payload: receivedPageNumbers,
  };
};

export const setWebSocket = () => {
  const port = process.env.PORT || 4000;
  const serverHostname = `${window.location.hostname}:${port}`
  return {
    type: "setWebSocket",
    payload: new WebSocket(`ws://${serverHostname}`),
  };
};