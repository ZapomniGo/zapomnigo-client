import axios from "axios";

const HEROKU_URL = "https://zapomnigo-server-aaea6dc84a09.herokuapp.com/v1";

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
        .post(`${HEROKU_URL}/refresh`)
        .then(() => {
          return instance.request(config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default instance;
