import axios from 'axios'
import { Message } from 'iview'


//请求
const baseURL = 'http://192.168.1.114:8080';
//url地址前相同的一段封装
const $http = axios.create({
    baseURL: baseURL
})

//请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
axios.interceptors.request.use(function (config) {
    Message.error('aaa')
    console.log(a)
    if (localStorage.getItem('header')) {
        config.headers.header = localStorage.getItem('header')
    }
    return config
}, function (error) {
    return Promise.reject(error);
})

//请求响应
axios.interceptors.response.use(
    response => {
        console.log('ssss')
        // if (response.status === 200) {  
        //     return Promise.resolve(response);        
        // } else {            
        //     return Promise.reject(response);        
        // }
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
)


//封装get
export function get(url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.get(url, {
            params,
        }).then(res => {
            if (res.data.status == 0) {
                resolve(res.data)
            } else {
                alert(res.data.msg)
            }
        }).catch(err => {
            Message.error('请求异常')
        })
    })
}
//封装post
export function post(url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.post(url,
            params
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            Message.error('请求异常')
        })
    })
}

// //封装get
// export const get = (url, params) => {
//     params = params || {};
//     return new Promise((resolve, reject) => {
//         $http.get(url, {
//             params,
//         }).then(res => {
//             if (res.data.status == 0) {
//                 resolve(res.data)
//             } else {
//                 alert(res.data.msg)
//             }
//         }).catch(err => {
//             Message.error('请求异常')
//         })
//     })
// }

// //封装post
// export const post = (url, params) => {
//     params = params || {};
//     return new Promise((resolve, reject) => {
//         $http.post(url,
//             params
//         ).then(res => {
//             resolve(res.data)
//         }).catch(err => {
//             Message.error('请求异常')
//         })
//     })
// }