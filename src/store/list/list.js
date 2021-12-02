
export const list={
    namespaced: true,
    state:{
       listArr:[],
    },
    actions: {
        
      getlistMusic({commit,state},res){
        console.log('接收到了数据',res)
        //   let obj={}
        //   obj.music=res
        //   obj.id=id
          
          state.listArr.push(res)
          commit('getArr')

      },
  },

  mutations:{//异步操作不能进行
      getArr(){
        
      },

  }


}