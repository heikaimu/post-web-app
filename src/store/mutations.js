import * as types from './mutation-types';

export const state = {
  loginIfo: JSON.parse(sessionStorage.getItem('loginIfo') || '{}')
}

export const mutations = {
  [types.SET_LOGIN](state, loginIfo) {
    state.loginIfo = loginIfo;
    sessionStorage.setItem('loginIfo', JSON.stringify(state.loginIfo));
  },
  [types.LOGOUT](state) {
    state.loginIfo = {};
    sessionStorage.setItem('loginIfo', JSON.stringify(state.loginIfo));
  },
  [types.SET_HEAD_THUMB](state, headThumb) {
    state.loginIfo.data.head_thumb = headThumb;
    sessionStorage.setItem('loginIfo', JSON.stringify(state.loginIfo));
  },
  [types.SET_NICKNAME](state, nickname) {
    state.loginIfo.data.nickname = nickname;
    sessionStorage.setItem('loginIfo', JSON.stringify(state.loginIfo));
  },
  [types.SET_BACKGROUND](state, background) {
    state.loginIfo.data.background = background;
    sessionStorage.setItem('loginIfo', JSON.stringify(state.loginIfo));
  }
}
