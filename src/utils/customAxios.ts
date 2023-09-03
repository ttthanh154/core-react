import axios from "axios";
import { funcUtils } from "./hook";

const baseURL = import.meta.env.VITE_BACKEND_API;
const NO_RETRY_HEADER = "X-No-Retry";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const handleRefreshToken = async () => {
  const res = await instance.get(`/api/v1/auth/refresh`);
  if (res?.data) return res.data.access_token;
  else null;
  console.log(res);
};

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
    // console.log(">>>axios res: ", response.data);
    return response?.data ?? response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error?.response?.data);

    let message = "";
    let statusCode = error?.response?.data?.statusCode;
    let token = localStorage.getItem("access_token");
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

    if (token && statusCode === 401 && !error.config.headers[NO_RETRY_HEADER]) {
      const accessToken = await handleRefreshToken();
      if (accessToken) {
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        error.config.headers[NO_RETRY_HEADER] = true;
        // localStorage.clear();
        localStorage.setItem("access_token", accessToken);
        return instance.request(error.config);
      }
    }
    if (error?.config && error?.response && statusCode === 400 && error.config.url === '/api/v1/auth/refresh') {
      window.location.href = "/login";
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
