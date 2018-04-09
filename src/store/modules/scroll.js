import * as types from '../mutation-types';

const state = {
  scrollIfo: [
    {
      name: 'recommend',
      pageId: 1,
      position: 0
    },
    {
      name: 'post_list',
      pageId: 1,
      position: 0
    },
    {
      name: 'reply_list',
      pageId: 1,
      position: 0
    }
  ]
}

const mutation = {
  [types.SET_PAGE_SCROLL](state, data) {
    const { componentName } = data;
    const indexOfComponent = state.scrollIfo.findIndex((item) => {
      return item.name = componentName;
    });
    state.scrollIfo[indexOfComponent] = data;
  }
}

export default {
  state,
  mutation
}
