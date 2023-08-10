import axios from "axios";
import { funcUtils } from "./hook";

const baseURL = import.meta.env.VITE_BACKEND_API;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(">>>axios res: ", response.data);
    return response?.data ?? response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error?.response?.data);

    let message = "";
    if (error?.response?.data) {
      let err = error.response.data;
      // In case err.message has an Array
      if (Array.isArray(err.message)) {
        message = err.message[0];
      } else {
        message = err.message;
      }
      funcUtils.notify(message, "error");
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
