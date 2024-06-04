// Cart reducer to manage cart state
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const find = state.find((pd) => pd.id === action.payload.id);
      if (find) {
        return state.map((item) =>
          //checking for user request from wishlist button
          item.id === action.payload.id && action.payload.quantity != 1
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }

      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
