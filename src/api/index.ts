import axios from 'axios';
import { message } from 'antd';
import { HttpCode } from '../constant/api';
import { getToken } from '../model/userInfo';

const myAxios = axios.create({
  timeout: 10000,
});

myAxios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
myAxios.defaults.transformRequest = (data) => {
  return JSON.stringify(data);
};

myAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { code, msg } = res;

    switch (code) {
      case HttpCode.success:
        return Promise.resolve(res);
      case HttpCode.token_expired:
        message.error({
          content: '登录已过期，请重新登录！',
        });
        break;
      case HttpCode.token_err:
        message.error({
          content: msg || '参数错误！',
        });
        break;
      case HttpCode.token_server_err:
        message.error({
          content: '服务器错误',
        });
        break;
      default:
        message.error({
          content: '请重试',
        });
    }

    return Promise.reject(res);
  },

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          message.error({
            content: '请求的资源不存在',
          });
          break;
        case 500:
          message.error({
            content: '内部错误，请稍后重试',
          });
          break;
        case 503:
          message.error({
            content: '服务器正在维护，请稍后重试',
          });
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

type Params = {
  [key: string]: any;
};
export const get = (url: string, params: Params, config = {}) =>
  myAxios.get(url, { ...config, params });
export const deletes = (url: string, params: Params, config = {}) =>
  myAxios.delete(url, { ...config, params });
export const post = (url: string, params: Params, config = {}) => myAxios.post(url, params, config);
export const put = (url: string, params: Params, config = {}) => myAxios.put(url, params, config);
