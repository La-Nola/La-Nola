import axios from "axios";
//! Add an item to the cart
export const addCartItem = async (dispatchCart, cartItem, cartID) => {
  try {
    console.log("CARTITEM", cartItem);
    //! Otherwise submit the new item to the DB
    const response = await axios.post(`/carts/${cartID}`, cartItem);
    dispatchCart({
      type: "UPDATE_CART",
      payload: response.data.data.items,
    });
  } catch (error) {
    console.log(error);
  }
};
//! Get all items from the cart
export const getCartData = async (dispatchCart, cartID) => {
  try {
    const response = await axios.get(`/carts/${cartID}`);
    if (response.data.data && response.data.data.items) {
      dispatchCart({ type: "UPDATE_CART", payload: response.data.data.items });
    }
  } catch (error) {
    console.log(error);
  }
};
// //! Delete an item from the cart by its ID
export const deleteItemById = async (dispatchCart, cartID, productId) => {
  try {
    const response = await axios.put(`/carts/${cartID}`, {
      product: productId,
      // quantity: -1,
    });
    dispatchCart({ type: "UPDATE_CART", payload: response.data.data.items });
  } catch (error) {
    console.log(error);
  }
};
// //! clear all cart items function
export const emptyCart = async (dispatchCart, cartID) => {
  try {
    const response = await axios.delete(`/carts/${cartID}`);

    dispatchCart({ type: "UPDATE_CART", payload: response.data.data.items });
  } catch (error) {
    console.log(error);
  }
};
