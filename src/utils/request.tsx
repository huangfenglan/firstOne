import axios from 'axios'
import {requestTimeout,baseURL} from './constant'

const handleResult:any=(response:any)=>{
  const {data}=response
  const {code}=data
  //这里做业务判断

  if(code!==200){
    const {message:msg}=data
    Promise.reject(msg)
  } 
  return data
}

//创建实例
const fetch = axios.create({
  baseURL: baseURL,
  timeout: requestTimeout,
  headers: {'X-Custom-Header': 'foobar'} 
})

// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
  fetch.defaults.headers.aaa="bbbb" //自定义请求头
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
fetch.interceptors.response.use(function (response) {
  const result=handleResult(response)
  return result;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export {fetch}

