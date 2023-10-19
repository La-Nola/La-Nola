export const usersInitialState = {
  // user: {},// can store additional user information
  user: {},
  isLoggedIn: false,
  errorMessage: "",
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };

    case "LOGIN_FAILED":
      return {
        ...state,
        errorMessage: action.payload,
      };

    case "LOGOUT":
      return usersInitialState;

    case "UPDATEUSERBYID":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
