// import {UPDATECARD} from './store-types'
// import Vue from 'vue'
export const mutations= {
   //  getString(x,obj){//第一个参数是state,第二个参数才是自己传入的参数
   //     x.stu.push(obj)
   //  },
   //  [UPDATECARD](state){//避免和其他组件写错
   //     Vue.set(state.newObj,'fang',2000)//设置新增的数据(监视)
   //  }
   rankTitle(state,data){
      state.rank=data
   },

   listTitle(state,data){
      state.listSings=data
   },

   rankSings(state,data){
      state.rankSings=data
   },







}