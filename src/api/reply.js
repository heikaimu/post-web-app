import {requestPost} from '@/common/js/request';
const API_CONFIG = '/reply';

/**
 * 回复：新增
 * params: {
     *  postId: number
     *  content: string
     *  imgList: string
     * }
 * api: /reply/addOne
 */
export const addOne = (data) => {
  return requestPost(`${API_CONFIG}/addOne`, data);
}

/**
 * 回复：列表
 * params: {
     *  postId: number
     *  pageId: number
     *  pageSize: number
     * }
 * api: /reply/getList
 */
export const getList = (data) => {
  return requestPost(`${API_CONFIG}/getList`, data);
}

/**
 * 回复：删除
 * params: {
     *  replyId: number
     * }
 * api: /reply/deleteOne
 */
export const deleteFloor = (data) => {
  return requestPost(`${API_CONFIG}/deleteOne`, data);
}

/**
 * 回复：获取单个详情
 * params: {
     *  replyId: number
     * }
 * api: /reply/getDetails
 */
export const getDetails = (data) => {
  return requestPost(`${API_CONFIG}/getDetails`, data);
}
