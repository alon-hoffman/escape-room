import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { gameObjectStore } from './gameObject.store.js'
import { gameStore } from './game.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    gameObjectStore,
    gameStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
