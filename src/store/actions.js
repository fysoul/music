export const actions={
    // test(content,obj){return new Promise((resolve)=>
    // {setTimeout(() => {content.commit('getString',obj)}, 2000);})}

    rankTitle({state,commit},res){//排行榜标题
       commit('rankTitle',res)
    },

    listTitle({state,commit},res){//热门推荐
        commit('listTitle',res)
    },

    rankSings({state,commit},res){//排行榜默认第一个歌单歌曲
       commit('rankSings',res)
    } 
}