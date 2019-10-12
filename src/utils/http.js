import axios from 'axios'
import { Message } from 'iview'


//请求
const baseURL = 'https://backend.gps.zydrfid.com';
//url地址前相同的一段封装
const $http = axios.create({
    baseURL: baseURL
})

//封装get
export const get = (url, params) => {
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
            this.$Message.error('请求异常')
        })
    })
}

//封装post
export const post = (url, params) => {
    params = params || {};
    return new Promise((resolve, reject) => {
        $http.post(url,
            params
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            this.$Message.error('请求异常')
        })
    })
}