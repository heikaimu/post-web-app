import axios from 'axios';
import { Toast, Indicator } from 'mint-ui';

const Axios = axios.create({
  // baseURL: "http://localhost:5000", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
});

let cancel ,promiseArr = {};
//请求拦截器
Axios.interceptors.request.use(config => {
  Indicator.open();
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel;
  } else {
    promiseArr[config.url] = cancel;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//响应拦截器即异常处理
Axios.interceptors.response.use(response => {
  Indicator.close();
  if (response.data && !response.data.state) {
    Toast({
      message: response.data.message,
      duration: 2000
    });
  }
  return response;
}, (error) => {
  console.log(error);
  // if (error && error.response) {
  //   switch (error.response.status) {
  //     case 400:
  //       error.message = '错误请求';
  //       break;
  //     case 401:
  //       error.message = '未授权，请重新登录';
  //       break;
  //     case 403:
  //       error.message = '拒绝访问';
  //       break;
  //     case 404:
  //       error.message = '请求错误,未找到该资源';
  //       break;
  //     case 405:
  //       error.message = '请求方法未允许';
  //       break;
  //     case 408:
  //       error.message = '请求超时';
  //       break;
  //     case 500:
  //       error.message = '服务器端出错';
  //       break;
  //     case 501:
  //       error.message = '网络未实现';
  //       break;
  //     case 502:
  //       error.message = '网络错误';
  //       break;
  //     case 503:
  //       error.message = '服务不可用';
  //       break;
  //     case 504:
  //       error.message = '网络超时';
  //       break;
  //     case 505:
  //       error.message = 'http版本不支持该请求';
  //       break;
  //     default:
  //       error.message = `连接错误${error.response.status}`;
  //   }
  // } else {
  //   error.message = "连接到服务器失败";
  // }
});

/**
 * [requestGet 封装get请求]
 * @param {[string]} url [请求地址]
 * @return {[object]}    [promise]
 */
export function requestGet(url, query) {
  return Axios.get(url, {params: query || {}})
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

/**
 * [requestPost 封装post请求]
 * @param {[string]} url [请求地址]
 * @param {[object]} data [数据]
 * @return {[object]}    [promise]
 */
export function requestPost(url, data) {
  return Axios.post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

/**
 * [request_put 封装put请求]
 * @param  {[string]} url  [请求地址]
 * @return {[object]}      [promise]
 */
export function requestPut(url, data) {
  return Axios.put(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

/**
 * [request_delete 封装delete请求]
 * @param  {[string]} url  [请求地址]
 * @return {[object]}      [promise]
 */
export function requestDelete(url) {
  return Axios.delete(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
