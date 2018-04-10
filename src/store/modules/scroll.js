import * as types from '../mutation-types';

const state = {
  scrollIfo: [
    {
      name: 'recommend',
      pageId: 1,
      position: 0
    },
    {
      name: 'post',
      pageId: 1,
      position: 0
    },
    {
      name: 'reply',
      pageId: 1,
      position: 0
    },
    {
      name: 'myPost',
      pageId: 1,
      position: 0
    }
  ]
}

const mutations = {
  [types.SET_PAGE_SCROLL](state, data) {
    const { name, position, pageId } = data;
    const indexOfComponent = state.scrollIfo.findIndex((item) => {
      return item.name === name;
    });
    state.scrollIfo[indexOfComponent].pageId = pageId;
    state.scrollIfo[indexOfComponent].position = position;
  }
}

export default {
  state,
  mutations
}
