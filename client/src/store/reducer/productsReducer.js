export const productsInitialState = {
  candles: {},
  postcards: {},
  kidsClothes: {},
};
//Initialing state for the product data,

// for handling actions such as fetching data for specific product and individual products.
export const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CANDLES_SUCCESS":
      /* 
         When the action type is 'FETCH_CANDLES_SUCCESS', update the state by replacing the 'candles' empty object {} (initial default state) 
         with the fetched data related to candles.
      */
      return {
        ...state,
        candles: action.payload,
      };

    case "FETCH_POSTCARDS_SUCCESS":
      /* 
         When the action type is 'FETCH_POSTCARDS_SUCCESS', update the state by replacing the 'postcards' empty object {} (initial default state) 
         with the fetched data related to candles.
      */
      return {
        ...state,
        postcards: action.payload,
      };

    case "FETCH_KIDSCLOTHES_SUCCESS":
      /* 
         When the action type is 'FETCH_KIDSCLOTHES_SUCCESS', update the state by replacing the 'kidsClothes' empty object {} (initial default state) 
         with the fetched data related to kids' clothes.
      */
      return {
        ...state,
        kidsClothes: action.payload,
      };

    default:
      /* 
         we are returning the current state without any changes, when NO match with the above predefined cases.
      */
      return state;
  }
};
