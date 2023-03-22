import Axios, { AxiosRequestConfig } from 'axios';

const { VITE_API } = import.meta.env;

const instance = Axios.create({
  baseURL: VITE_API + '/v1',
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get<T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
) {
  return instance.get<T, T>(url, config);
}

export function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) {
  return instance.post<T, T>(url, data, config);
}

export default instance;
