import axios from "axios";

const IS_PROD = import.meta.env.VITE_IS_PROD;

// const IS_PROD =
//   window.location.href.indexOf("localhost") === -1 ||
//   window.location.href.indexOf("zapomnigo") !== -1;

const HEROKU_URL_DEV = import.meta.env.VITE_HEROKU_URL_DEV;
const HEROKU_URL_PROD = import.meta.env.VITE_HEROKU_URL_PROD;
const HEROKU_URL = IS_PROD === "true" ? HEROKU_URL_PROD : HEROKU_URL_DEV;

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = access_token;
    }
    config.url = HEROKU_URL + config.url;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const config = error.config;
    if (
      (error.response && error.response.status === 498) ||
      error.response.status === 499
    ) {
      return axios
        .post(
          `${HEROKU_URL}/refresh`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem("refresh_token"),
            },
          }
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          config.headers.Authorization = res.data.access_token;
          localStorage.setItem("refresh_token", res.data.refresh_token);
          return axios.request(config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else if (error.response.status === 500) {
      window.location.href = "/app/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
