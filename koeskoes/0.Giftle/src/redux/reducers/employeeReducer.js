const initialOrderState = {
  orders: [],
  filteredOrders: [],
  searchParams: "",
  pageNumber: 1,
  pageNumbers: 1,
};

export function employeeReducer(state = initialOrderState, action) {
  switch (action.type) {
    case "setOrders":
      if (state.orders === action.payload) {
        return {...state}
      }
      else {
        return {
          ...state,
          orders: action.payload,
        };
      }

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

    case "setPageNumbers":
      return {
        ...state,
        pageNumbers: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
