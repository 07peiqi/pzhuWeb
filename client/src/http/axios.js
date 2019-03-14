import axios from 'axios';
import {
    message
} from 'antd';
message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});


axios.defaults.baseURL = 'http://127.0.0.1:7001/api'

axios.defaults.timeOut = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//允许axio请求携带cookies
axios.defaults.withCredentials = true


// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 404:
                    message.error(error.response.data.message)
                    break;
                default:
                    message.error("请求有误")
            }
            return Promise.reject(error.response);
        }
    }
)


export default axios