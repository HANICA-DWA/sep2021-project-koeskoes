const initialOrderState = {
  orders: [],
  filteredOrders: [],
  searchParams: "",
  pageNumber: 1,
  textCode: '',
  videoPath: '',
  videoUploaded: false,
};

export function orderReducer(state = initialOrderState, action) {
  switch (action.type) {
    case "setOrders":
      return {
        ...state,
        orders: action.payload,
      };

    case "setSearch":
      const filteredOrders = state.orders.filter((order) => {
        for (const key in order) {
          if (("" + order[key]).includes(action.payload)) {
            return order;
          }
        }

        return null;
      });
      return {
        ...state,
        filteredOrders,
        searchParams: action.payload,
      };

    case "setPageNumber":
      return {
        ...state,
        pageNumber: action.payload,
      };

    case "setTextCode":
      return {
        ...state,
        textCode: action.payload,
      };

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

    default:
      return {
        ...state,
      };
  }
}
