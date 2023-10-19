import { createContext, useEffect, useReducer, useState } from "react";

import {
  productsInitialState,
  productsReducer,
} from "./reducer/productsReducer";

import {
  usersInitialState,
  usersReducer,
} from "../store/reducer/usersReducer.js";

import {
  getCandles,
  getKidsClothes,
  getPostcards,
} from "../apiCalls/productsApiCalls";
import cartReducer, { initialCartState } from "./reducer/cartReducer";
import { getMyData } from "../apiCalls/usersApiCalls";
import { setAxiosDefaults } from "../utils/axiosConfig";
import { getCartData } from "../apiCalls/cartsApiCalls";

// To manage global state, we Created a new context.
export const DataContext = createContext();

// The ContextProvider component is responsible for providing global state to our App
const ContextProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState);
  // for handling error messages.
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchState, setSearchState] = useState(false);

  // To manage user-related state, we need to use a reducer.
  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    usersInitialState
  );

  // To manage product-related state, we need to use a reducer.
  const [productsState, dispatchProducts] = useReducer(
    productsReducer,
    productsInitialState
  );

  const { user, isLoggedIn } = usersState;

  /* Fetch initial product data when the component mounts using useEffect. */
  useEffect(() => {
    /* Call API functions to fetch data for different product categories. */
    getCandles(dispatchProducts);
    getPostcards(dispatchProducts);
    getKidsClothes(dispatchProducts);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getMyData();
      if (response && response.isAuthenticated) {
        dispatchUsers({ type: "LOGIN_SUCCESS", payload: response });
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn && user.cartId) {
      setAxiosDefaults();
      getCartData(dispatchCart, user.cartId);
    }
  }, [isLoggedIn, user.cartId]);

  /* Render the children components within the context provider. */
  return (
    <DataContext.Provider
      value={{
        cartState,
        dispatchCart,
        error,
        setError,
        usersState,
        dispatchUsers,
        productsState,
        dispatchProducts,
        setSearchValue,
        searchValue,
        searchState,
        setSearchState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default ContextProvider;
