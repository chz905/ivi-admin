
import Vue from 'vue'
import axios from 'axios';
import QS from 'qs';
import { Message } from 'iview';
// Vue.prototype.axios = axios;
//地址
axios.defaults.baseURL = '';
//请求超时时间
axios.defaults.timeout = 10000;
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器
axios.interceptors.request.use(config => {
    // console.log('config++', config.headers,localStorage.header)
    
    if (localStorage.userid) {
        config.headers.userid = localStorage.getItem('userid')
    }
    return config
}, error => {
    return Promise.reject(error);
})
//响应拦截
axios.interceptors.response.use(response => {
    // console.log(response)
    return response
}, error => {
    Indicator.close();
    return Promise.reject(error)
})

//get 封装
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
                Message.error('请求异常')
            })
    });
}

//post 封装 
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
                Message.error('请求异常')
            })
    });
}
