import {requestPost} from '@/common/js/request';
const API_CONFIG = '/theme';

/**
 * 主题：新增
 * params: {
     *  name: string
     *  headThumb: string
     * }
 * api: /theme/addOne
 */
export const addOne = (data) => {
  return requestPost(`${API_CONFIG}/addOne`, data);
}

/**
 * 主题：删除
 * params: {
     *  themeId: number
     * }
 * api: /theme/deleteOne
 */
export const deleteOne = (data) => {
  return requestPost(`${API_CONFIG}/deleteOne`, data);
}

/**
 * 主题：列表
 * params: {
     *  keyword: string
     * }
 * api: /theme/getList
 */
export const getList = (data) => {
  return requestPost(`${API_CONFIG}/getList`, data);
}

/**
 * 主题：详情
 * params: {
     *  themeId: number
     * }
 * api: /theme/getDetails
 */
export const getDetails = (data) => {
  return requestPost(`${API_CONFIG}/getDetails`, data);
}

/**
 * 主题：我的关注
 * params: {}
 * api: /theme/focusList
 */
export const focusList = (data) => {
  return requestPost(`${API_CONFIG}/focusList`, data);
}

/**
 * 主题：关注
 * params: {
     *  themeId: number
     * }
 * api: /theme/focus
 */
export const focus = (data) => {
  return requestPost(`${API_CONFIG}/focus`, data);
}

/**
 * 主题：取消关注
 * params: {
     *  themeId: number
     * }
 * api: /theme/unFocus
 */
export const unFocus = (data) => {
  return requestPost(`${API_CONFIG}/unFocus`, data);
}

/**
 * 主题：签到
 * params: {
     *  themeId: number
     * }
 * api: /theme/signIn
 */
export const signIn = (data) => {
  return requestPost(`${API_CONFIG}/signIn`, data);
}

