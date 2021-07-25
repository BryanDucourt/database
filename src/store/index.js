import { createStore } from 'vuex'

export default createStore({
  state: {
    user:"",
    token:"",
    flag: 1
  },
  mutations: {
    updateUser(state,username){
      state.user=username
    },
    updateToken(state,token){
      state.token=token
    },
    updateFlag(state, flag){
      state.flag=flag
    }

  },
  actions: {
  },
  modules: {
  }
})
