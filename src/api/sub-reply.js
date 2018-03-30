import {requestPost} from '@/common/js/request';
const API_CONFIG = '/sub_reply';

/**
 * 二级回复：新增
 * params: {
     *  postId: number
     *  replyId: number
     *  content: string
     * }
 * api: /sub_reply/addOne
 */
export const addOne = (data) => {
  return requestPost(`${API_CONFIG}/addOne`, data);
}

/**
 * 二级回复：获取列表
 * params: {
     *  replyId: number
     * }
 * api: /sub_reply/getList
 */
export const getList = (data) => {
  return requestPost(`${API_CONFIG}/getList`, data);
}


