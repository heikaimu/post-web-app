import {requestPost} from '@/common/js/request';
const API_CONFIG = '/qiniu';
const DOMAIN = 'http://ow99hkq6k.bkt.clouddn.com/';
const HEADTYPE = '?imageView2/5/w/200/h/200/q/100|imageslim';
const NORMALIMG = '?imageslim';
import * as $ from 'jquery';

export default class qiniu {
  // 获取token
  static async getToken(data) {
    return requestPost(`${API_CONFIG}/getToken`, data);
  }
  // 上传图片
  static async upload(file) {
    const param = new FormData();
    const { token } = await this.getToken();
    param.append('file', file);
    param.append('token', token);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: 'http://upload.qiniu.com/',
        data: param,
        contentType: false,
        processData: false,
        async: true,
        success: (data) => {
          const url = `${DOMAIN}${data.key}${NORMALIMG}`;
          resolve(url);
        }
      })
    });
  }
}
