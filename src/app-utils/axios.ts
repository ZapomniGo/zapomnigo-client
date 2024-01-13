import axios from "axios";

const IS_PROD = import.meta.env.IS_PROD;

// const IS_PROD =
//   window.location.href.indexOf("localhost") === -1 ||
//   window.location.href.indexOf("zapomnigo") !== -1;

const HEROKU_URL_DEV = "https://dev-server-zapomnigo-3b17b7751381.herokuapp.com/v1";
const HEROKU_URL_PROD = "https://dev-server-zapomnigo-3b17b7751381.herokuapp.com/v1";
const HEROKU_URL = IS_PROD ? HEROKU_URL_PROD : HEROKU_URL_DEV;

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
          console.log(config);
          return axios.request(config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default instance;
