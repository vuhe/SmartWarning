import axios, { AxiosInstance } from 'axios';
import { getToken } from './authorize';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

/**
 * Add a request interceptor
 * 全局请求拦截
 */
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers['authorization'] = 'Bearer '.concat(getToken());
    config.headers.authorization = 'Bearer '.concat(getToken());
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

/**
 * Add a response interceptor
 * 全局响应拦截
 */
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // return response;
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

/**
 * get请求
 * @param {string} url 请求地址
 * @param {Object} params 参数
 */
export function get(url: string, params?: any): Promise<any> {
  return axios.get(url, {
    params,
  });
}

/**
 * post请求
 * @param {string} url 请求地址
 * @param {Object} data 数据
 */
export function post(url: string, data: any): Promise<any> {
  return axios.post(url, data);
}
