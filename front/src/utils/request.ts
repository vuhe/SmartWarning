import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { getToken } from './authorize';

export const BASE_URL_1 = 'https://sw.zhuhe.site';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://sw.zhuhe.site',
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
export function get(url: string, params?: any): Promise<any> {
  return instance.get(url, {
    params,
  });
}

/**
 * post请求
 * @param {string} url 请求地址
 * @param {Object} data 数据
 */
export function post(url: string, data: any): Promise<any> {
  return instance.post(url, data);
}

/**
 * put请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url: string, data: any): Promise<any> {
  return instance.put(url, data);
}

/**
 * delete请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function deleteRequest(url: string, data: any): Promise<any> {
  return instance.delete(url, { data });
}

/**
 * put请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url: string, data: any): Promise<any> {
  return axios.put(url, data, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getToken(),
    },
  });
}

/**
 * delete请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function deleteRequest(url: string, data: any): Promise<any> {
  return axios.delete(url, {
    data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getToken(),
    },
  });
}
