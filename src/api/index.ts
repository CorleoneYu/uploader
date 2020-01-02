import axios from 'axios';
import { message } from 'antd';
import { apiUrls, HttpCode } from '../constant/index';

const myAxios = axios.create({
  timeout: 10000,
});

myAxios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';
// myAxios.defaults.transformRequest = data => {
//   return JSON.stringify(data);
// }

myAxios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === HttpCode.success) {
      return Promise.resolve(res.data);
    }

    if (
      res.code === HttpCode.token_expired ||
      res.code === HttpCode.token_err ||
      res.code === HttpCode.token_not
    ) {
      message.error({
        content: '登录已过期，请重新登录！',
      });
    } else {
      message.error({
        content: '网络异常，请稍后重试',
      });
    }
    return Promise.reject(res);
  },

  error => {
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

const get = (url: string, params, config = {}) =>
  myAxios.get(url, { ...config, params });
const deletes = (url: string, params, config = {}) =>
  myAxios.delete(url, { ...config, params });
const post = (url: string, params, config = {}) =>
  myAxios.post(url, params, config);
const put = (url: string, params, config = {}) =>
  myAxios.put(url, params, config);

export default {
  get,
  post,
  deletes,
  put,
};
