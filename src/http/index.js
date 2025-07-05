import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || "http://localhost:6002/",
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || "http://localhost:6002/",
});

const authInterceptor = async (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};
const onResponseFail = (error) => {
  const status = error.status || error.response.status;
  if (status === 401 || (status === 417 && error.message === "jwt expired")) {
    localStorage.removeItem("token");
  }

  return Promise.reject(error);
};

$authHost.interceptors.request.use(authInterceptor, onResponseFail);

$authHost.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message == "jwt expired") {
      localStorage.removeItem("token");
    }
  }
);

export { $host, $authHost };
