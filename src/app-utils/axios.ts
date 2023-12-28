import axios from 'axios';

const HEROKU_URL = 'https://zapomnigo-server-aaea6dc84a09.herokuapp.com/v1';

const instance = axios.create();

instance.interceptors.request.use((config) => {
    config.url = HEROKU_URL + config.url; 
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    let config = error.config;

    if (error.response && error.response.status === 499) {
      return axios.post(`${HEROKU_URL}/refresh`)
        .then(() => {
          return instance.request(config)
        }).catch((error) => {
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
});

export default instance;