import {requestPost} from '@/common/js/request';
const API_CONFIG = '/post';

/**
 * 帖子：新增
 * params: {
     *  themeId: number
     *  title: string
     *  content: string
     *  imgList: string
     * }
 * api: /post/addOne
 */
export const addOne = (data) => {
  return requestPost(`${API_CONFIG}/addOne`, data);
}

/**
 * 帖子：删除
 * params: {
     *  postId: number
     * }
 * api: /post/deleteOne
 */
export const deleteOne = (data) => {
  return requestPost(`${API_CONFIG}/deleteOne`, data);
}

/**
 * 帖子：列表
 * params: {
     *  themeId: number
     *  pageId: number
     *  pageSize: number
     * }
 * api: /post/getList
 */
export const getList = (data) => {
  return requestPost(`${API_CONFIG}/getList`, data);
}

/**
 * 帖子：推荐贴列表
 * params: {
     *  pageId: number
     *  pageSize: number
     * }
 * api: /post/getPublish
 */
export const getPublish = (data) => {
  return requestPost(`${API_CONFIG}/getPublish`, data);
}

/**
 * 帖子：我发布的
 * params: {
     *  pageId: number
     *  pageSize: number
     * }
 * api: /post/getPublish
 */
export const getMine = (data) => {
  return requestPost(`${API_CONFIG}/getMine`, data);
}

/**
 * 帖子：获取详情
 * params: {
     *  postId: number
     * }
 * api: /post/getDetails
 */
export const getDetails = (data) => {
  return requestPost(`${API_CONFIG}/getDetails`, data);
}

