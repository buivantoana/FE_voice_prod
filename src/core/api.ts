import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});
instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user');
    if (token) {
      const parsedToken = JSON.parse(token);
      if (Object.keys(parsedToken).length > 0) {
        if (config.url === '/auth/refeshtoken') {
          config.headers.Authorization = `Bearer ${parsedToken.refeshToken}`;
        } else {
          config.headers.Authorization = `Bearer ${parsedToken.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem('user');
      if (token) {
        const parsedToken = JSON.parse(token);
        try {
          const response = await axios.get('http://localhost:4000/auth/refeshtoken', {
            headers: {
              Authorization: `Bearer ${parsedToken.refeshToken}`,
            },
          });
          if (response.data.status === 0) {
            localStorage.setItem('user', JSON.stringify({
              ...parsedToken,
              token: response.data.accessToken,
            }));
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
            return instance(originalRequest);
          }
        } catch (e) {
        
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
