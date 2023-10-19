export const initialCartState = {
  isOpen: false,
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};
export default cartReducer;
