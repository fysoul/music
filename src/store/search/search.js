
export const search={
      namespaced: true,
      state:{
         searchArray:[],
         songCount:0
      },
      actions: {
          
        getSearch({commit,state},res){
            state.searchArray.length=0//不能赋值为[],会监视不到
            state.searchArray.push(...res)
            commit('getSearch')

        },

        setCount({state,commit},res){
            console.log('setCounteeeeeeeeeeeeeeee',res)
            state.songCount=res
            commit('setCount')
        }

    },

    mutations:{//异步操作不能进行
        getSearch(){
          
        },

        setCount(){
          
        }

    }


}