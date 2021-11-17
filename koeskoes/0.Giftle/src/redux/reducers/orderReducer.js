const initialOrderState = {
  orders: [],
  filteredOrders: [],
  searchParams: '',
  pageNumber: 1,
};

export function orderReducer(state = initialOrderState, action) {
  switch (action.type) {
    case "setOrders":
      return { 
        ...state,
        orders: action.payload
      };

    case "setSearch":
      const filteredOrders = state.orders.filter(order => {
        for (const key in order) {
          if (('' + order[key]).includes(action.payload)) {
            return order;
          }
        }
        
        return null;
      });
      return { 
        ...state,
        filteredOrders,
        searchParams: action.payload
      };
    
    case "setPageNumber":
      return { 
        ...state,
        pageNumber: action.payload
      };

    default:
      return {
        ...state
      };
  }
}