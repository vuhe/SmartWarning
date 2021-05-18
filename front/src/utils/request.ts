import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getToken } from './localStorage';

// 所有 api 接口请求的 url 前缀
export const BASE_URL_1 = 'https://sw.zhuhe.site/api';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL_1,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

/**
 * Add a request interceptor
 * 全局请求拦截
 */
instance.interceptors.request.use(
  // config: 请求发送前的配置对象
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    config.headers.Authorization = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  },
);

/**
 * Add a response interceptor
 * 全局响应拦截
 */
instance.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
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
export function get(shortURL: string, params?: any): Promise<any> {
  return instance.get(BASE_URL_1 + shortURL, {
    params,
  });
}

/**
 * post请求
 * @param {string} url 请求地址
 * @param {Object} data 数据
 */
export function post(shortURL: string, data: any): Promise<any> {
  return instance.post(BASE_URL_1 + shortURL, data);
}

/**
 * put请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(shortURL: string, data: any): Promise<any> {
  return instance.put(BASE_URL_1 + shortURL, data);
}

/**
 * delete请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function deleteRequest(shortURL: string, data: any): Promise<any> {
  return instance.delete(BASE_URL_1 + shortURL, { data });
}
