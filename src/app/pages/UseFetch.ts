import { Axios } from 'axios';
import { useState } from 'react';

const hanlderResponse(code, data){
    if(code===200){
        return data
    }else{
        return
    }
}

let ins;
const UseFetch = (props) => {
const [response,setResponse]=useState({})
  const { url, mehtod, params, isInbody, ...rest } = props;
  ins = !ins
    ? new Axios({
        hostname: '',
        timeout: 50000,
      })
    : ins;
  const bodyarr = ['post'];
  ins.interceptors.request(() => {
    const isInbody = bodyarr.findIndex((val) => val === mehtod);
    return {
      url,
      mehtod,
      params: isInbody ? null : params,
      data: !isInbody ? null : params,
    };
  });
  ins.interceptors.response((result) => {
    const { code, data } = result;
    const finalData=hanlderResponse(code, data);
    setResponse(finalData)
  });

  return response;
};
