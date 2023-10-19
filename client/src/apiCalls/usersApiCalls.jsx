import axios from "axios";
import { setAxiosDefaults } from "../utils/axiosConfig";

export const signUp = async (formData) => {
  try {
    setAxiosDefaults();
    const response = await axios.post("/users/signup", formData);
    console.log("this is response", response);
    return response.data; // Return the response data on success
  } catch (error) {
    console.error("Signup error:", error.response);
    throw error; // Throw an error on failure
  }
};

export const login = async (dispatchUsers, formData) => {
  try {
    setAxiosDefaults();
    const response = await axios.post("/users/login", formData);
    console.log("Login response", response.data);
    dispatchUsers({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatchUsers({
      type: "LOGIN_FAILED",
      payload: error.response.data.message,
    });
    throw error; // Throw the error to be caught in the handleSubmit function
  }
};

export const logout = async (dispatchUsers, usersState) => {
  try {
    setAxiosDefaults();
    await axios.post("/users/logout", { email: usersState.user.email });
    dispatchUsers({ type: "LOGOUT" });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const updateUserById = async (dispatchUsers, usersState, formData) => {
  try {
    setAxiosDefaults();
    const response = await axios.patch(
      `/users/me/${usersState.user._id}`,
      formData
    );
    dispatchUsers({ type: "UPDATEUSERBYID", payload: response.data.data });
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const requestResetPassword = async (email) => {
  try {
    console.log(email);
    setAxiosDefaults();
    const response = await axios.post("/auth/requestResetPassword", {
      email: email,
    });
    return response;
  } catch (error) {}
};

export const resetPassword = async (userId, token, formData) => {
  const { password, passwordConfirm } = formData;
  try {
    setAxiosDefaults();
    const response = await axios.post("/auth/resetPassword", {
      userId: userId,
      token: token,
      password: password,
      passwordConfirm: passwordConfirm,
    });
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const getMyData = async () => {
  try {
    setAxiosDefaults();
    const response = await axios.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const placeOrder = async (order, usersState, dispatchUsers, items) => {
  try {
    setAxiosDefaults();
    const response = await axios.post("/users/placeOrder", {
      order: order,
      userId: usersState.user._id,
      items: items,
    });
    console.log(response);
    dispatchUsers({ type: "UPDATEUSERBYID", payload: response.data.data });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
