import axios from 'axios';
import { requestTimeout, baseURL } from './constant';
import { getMockData } from './userMock';
import { message } from 'antd';
import { User } from '@/services/userTs';
interface TesponseTs {
  code: number;
  message: string;
  data: any;
}

const handleResult = (response: any) => {
  const { code, message: msg, data } = response;
  //这里做业务判断
  if (code !== 200) {
    Promise.reject(msg);
    message.error(msg);
    return;
  } else {
    message.success(msg);
    return data;
  }
};

//创建实例
const fetch = axios.create({
  baseURL: baseURL,
  timeout: requestTimeout,
  headers: { 'X-Custom-Header': 'foobar' },
});

// 添加请求拦截器
fetch.interceptors.request.use(
  function (config) {
    fetch.defaults.headers.aaa = 'bbbb'; //自定义请求头
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
fetch.interceptors.response.use(
  function (response) {
    const result = handleResult(response);
    return result;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
const mockFetch = (url: string, method: string, data = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const finalUrl = `${url}_${method}`;
      const response = getMockData(finalUrl, data);

      const { code, message } = response;
      const result = handleResult(response);
      code === 200 && resolve(result);
      !(code === 200) && reject(message);
    }, 1500);
  });
};

const getMockResult = (data: User[], msg = '获取数据成功') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !!msg && message.success(msg);
      resolve(data);
    }, 1500);
  });
};

export { fetch, mockFetch, getMockResult };
