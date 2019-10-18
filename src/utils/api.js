import {get,post} from './xhr'

//登录
export const apiAddress = p => post('/users/login', p)
//车辆查询
export const findCar = p => post('/car/carlist', p)
//车辆删除
export const cardelete = p => post('/car/delete', p)
//车辆修改
export const carupdate = p => post('/car/update', p)


//查询全部角色
export const groupAllList = p => post('/group/groupAllList', p)
//查询管理用户
export const manageusers = p => post('/manageusers/manageuserslist', p)
//新增管理用户
export const manageusersadd = p => post('/manageusers/manageusersadd', p)
//修改管理用户
export const manageusersupdate = p => post('/manageusers/manageusersupdate', p)
//删除管理用户
export const manageusersdelete = p => post('/manageusers/manageusersdelete', p)


//查询角色
export const grouplist = p => post('/group/grouplist', p)
//新增角色
export const groupadd = p => post('/group/groupadd', p)
//修改角色
export const groupupdate = p => post('/group/groupupdate', p)
//删除角色
export const groupdelete = p => post('/group/groupdelete', p)


//新增授权


