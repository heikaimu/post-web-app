import {requestPost} from '@/common/js/request';
const API_CONFIG = '/new_message';

/**
 * 未读消息: 列表
 * api: /new_message/getList
 */
export const getList = () => {
  return requestPost(`${API_CONFIG}/getList`);
}

/**
 * 未读消息: 已阅
 * params: {
     *  messageId: number
     * }
 * api: /new_message/deleteOne
 */
export const deleteOne = (data) => {
  return requestPost(`${API_CONFIG}/deleteOne`, data);
}

