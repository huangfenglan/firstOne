import axios from 'axios'
import {requestTimeout,baseURL} from './constant'


const handleResult=(response:any)=>{
  console.log(response,"responseresponse");
  
}

//创建实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: requestTimeout,
  headers: {'X-Custom-Header': 'foobar'} 
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  instance.defaults.headers.aaa="bbbb" //自定义请求头
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const result=handleResult(response)
  
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance

