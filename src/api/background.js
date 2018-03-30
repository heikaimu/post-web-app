import {requestPost} from '@/common/js/request';
const API_CONFIG = '/background';

/**
 * 背景：新增
 * params: {
     *  url: string
     *  desc: string
     *  link: string
     *  type: string
     * }
 * api: /background/addOne
 */
export const addOne = (data) => {
  return requestPost(`${API_CONFIG}/addOne`, data);
}

/**
 * 背景：删除
 * params: {
     *  backgroundId: number
     * }
 * api: /background/deleteOne
 */
export const deleteOne = (data) => {
  return requestPost(`${API_CONFIG}/deleteOne`, data);
}

/**
 * 背景：列表
 * params: {
     *  type: string
     * }
 * api: /background/getList
 */
export const getList = (data) => {
  return requestPost(`${API_CONFIG}/getList`, data);
}

/**
 * 背景：详情
 * params: {
     *  backgroundId: number
     * }
 * api: /background/getDetails
 */
export const getDetails = (data) => {
  return requestPost(`${API_CONFIG}/getDetails`, data);
}

/**
 * 背景：编辑
 * params: {
     *  backgroundId: number
     *  url: string
     *  desc: string
     *  link: string
     *  type: string
     * }
 * api: /background/editOne
 */
export const editOne = (data) => {
  return requestPost(`${API_CONFIG}/editOne`, data);
}

/**
 * 背景：显示
 * params: {
     *  backgroundId: number
     *  show: boolean
     * }
 * api: /background/setShow
 */
export const setShow = (data) => {
  return requestPost(`${API_CONFIG}/setShow`, data);
}

/**
 * 背景：获取显示的那个
 * params: {
     *  type: string
     * }
 * api: /background/getShowOne
 */
export const getShowOne = (data) => {
  return requestPost(`${API_CONFIG}/getShowOne`, data);
}
