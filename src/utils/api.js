import {get,post} from './xhr'

//登录
export const apiAddress = p => post('/users/login', p)

//车辆查询
export const findCar = p => post('/car/carlist', p)
