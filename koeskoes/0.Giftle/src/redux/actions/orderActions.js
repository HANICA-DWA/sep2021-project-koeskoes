import axios from "axios";

export const setOrders = (orders) => {
  return {
    type: "setOrders",
    payload: orders,
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    const orders = await axios.get("http://localhost:4000/orders/all/");

    return dispatch(setOrders(orders.data));
  };
};

export const setSearch = (search) => {
  return {
    type: "setSearch",
    payload: search,
  };
};

export const setPageNumber = (pageNumber) => {
  return {
    type: "setPageNumber",
    payload: pageNumber,
  };
};

export const setTextCode = (textCode) => {
  return {
    type: "setTextCode",
    payload: textCode,
  };
};

export const setVideoPath = (videoPath) => {
  return {
    type: "setVideoPath",
    payload: videoPath,
  };
};

export const setVideoUploaded = () => {
  return {
    type: "setVideoUploaded",
  };
};