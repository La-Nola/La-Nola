import axios from "axios";

export const setAxiosDefaults = () => {
  process.env.NODE_ENV === "production"
    ? (axios.defaults.baseURL = "https://lanola.onrender.com")
    : (axios.defaults.baseURL = "https://la-nola-backend.onrender.com");

  axios.defaults.withCredentials = true;
};
