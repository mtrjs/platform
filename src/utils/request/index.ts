import { message } from 'antd';
import Axios, { AxiosRequestConfig } from 'axios';
import store from '../../store';
import storage from '@utils/storage';

const url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : 'https://octopus.dev.rabbitpre.com/api';

const instance = Axios.create({
  baseURL: `${url}/v1`,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const token = store.getState().user.access_token;
  const { app_id, env } = store.getState().application;

  if (app_id) {
    config.headers['app-id'] = app_id;
  }

  if (env) {
    config.headers['app-env'] = env;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const { code, message: msg } = response.data;
    if (code !== 0) {
      message.error(msg);
      return Promise.reject();
    }
    return response.data;
  },
  (err) => {
    const { response = {} } = err;
    const { status } = response;
    if (status === 401) {
      storage.delete('access_token');
      if (location.pathname !== '/login') {
        location.replace('/login');
      }
    }
    return Promise.reject(err);
  }
);

export function get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return instance.get<T, T>(url, config);
}

export function post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return instance.post<T, T>(url, data, config);
}

export default instance;
