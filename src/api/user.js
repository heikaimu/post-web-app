import {requestPost} from '@/common/js/request';
const API_CONFIG = '/user';

/**
 * 用户登录
 * params: {
     *  account: string
     *  password: string
     * }
 * api: /user/login
 */
export const login = (data) => {
  return requestPost(`${API_CONFIG}/login`, data);
}

/**
 * 判断是否注册
 * params: {
     *  account: string
     * }
 * api: /user/chargeIsRegister
 */
export const chargeIsRegister = (data) => {
  return requestPost(`${API_CONFIG}/chargeIsRegister`, data);
}

/**
 * 注册
 * params: {
     *  account: string
     *  password: string
     *  nickname: string
     *  gender: string(male, famale)
     * }
 * api: /user/register
 */
export const register = (data) => {
  return requestPost(`${API_CONFIG}/register`, data);
}

/**
 * 注销
 * params: {}
 * api: /user/logout
 */
export const logout = (data) => {
  return requestPost(`${API_CONFIG}/logout`, data);
}

/**
 * 获取用户信息
 * params: {
     *  uid: number(如果没有该参数获取当前登录的用户信息，有则获取对应的用户信息)
     * }
 * api: /user/getUser
 */
export const getUser = (data) => {
  return requestPost(`${API_CONFIG}/getUser`, data);
}

/**
 * 修改密码
 * params: {
     *  oldPwd: string
     *  newPwd: string
     * }
 * api: /user/updatePassword
 */
export const updatePassword = (data) => {
  return requestPost(`${API_CONFIG}/updatePassword`, data);
}

/**
 * 修改头像
 * params: {
     *  headhumb: string
     * }
 * api: /user/updateHeadThumb
 */
export const updateHeadThumb = (data) => {
  return requestPost(`${API_CONFIG}/updateHeadThumb`, data);
}

/**
 * 修改昵称
 * params: {
     *  nickname: string
     * }
 * api: /user/updateNickname
 */
export const updateNickname = (data) => {
  return requestPost(`${API_CONFIG}/updateNickname`, data);
}

/**
 * 修改背景
 * params: {
     *  background: string
     * }
 * api: /user/updateBackground
 */
export const updateBackground = (data) => {
  return requestPost(`${API_CONFIG}/updateBackground`, data);
}
