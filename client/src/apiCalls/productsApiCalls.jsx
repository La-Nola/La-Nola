/* import axios from "axios";
export const getProducts = async (dispatchProducts, category) => {
  try {
    const response = await axios.get(`http://localhost:8000/${category}`);
    // console.log(response.data);
    await dispatchProducts({
      type: "FETCH_PRODUCTS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productPreviewer = async (
  dispatchProducts,
  category,
  productId
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/${category}/${productId}`
    );
    console.log("this is the productId ", response.data);
    console.log("category, and productId ", productId, category);

    await dispatchProducts({
      type: "FETCH_PRODUCT",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
 */

import axios from "axios";

export const getCandles = async (dispatchProducts) => {
  try {
    const response = await axios.get(`https://la-nola-backend.onrender.com/candles`);
    await dispatchProducts({
      type: "FETCH_CANDLES_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostcards = async (dispatchProducts) => {
  try {
    const response = await axios.get(`https://la-nola-backend.onrender.com/postcards`);
    await dispatchProducts({
      type: "FETCH_POSTCARDS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getKidsClothes = async (dispatchProducts) => {
  try {
    const response = await axios.get(`https://la-nola-backend.onrender.com/kidsclothes`);
    await dispatchProducts({
      type: "FETCH_KIDSCLOTHES_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

