// 封装axios请求
import axios from "axios"
// 导入吐司
import { Toast} from 'antd-mobile';

//设置基准地址
const baseurl = "http://api-haoke-dev.itheima.net"
// 导出基准地址
export {baseurl}
const instance = axios.create({
    baseURL:baseurl
})
// Add a request interceptor配置请求
instance.interceptors.request.use(function (config) {
    // 请求中使用加载中提示框
    Toast.loading('Loading...', 1);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
  // Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 简化数据请求
    // 数据请求成功后关闭吐司
    Toast.hide()
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance

