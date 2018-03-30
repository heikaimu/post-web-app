import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import {state, mutations} from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  state,
  mutations,
  modules: {}
})
