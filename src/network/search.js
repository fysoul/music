
import {instance} from './request'

export function search(musicName){
    return instance({
        url:'search/suggest',//模糊搜索
        params:{
            keywords:musicName,
            
        }
    })
}

export function detailed({name,limit=5,offset=0}){
    
    return instance({
        url:'search',//模糊搜索
        params:{
            keywords:name,
            limit:limit,
            offset:offset,//偏移量
//1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
            type:1,
            
        }
    })
}

export function msg(ids){
    
    return instance({
        url:'song/detail',//详情搜索
        params:{
            ids,
        }
    })
}


export function lrc(id){
    
    return instance({
        url:'lyric',//搜索歌词
        params:{
            id,
            
        }
    })
}

 


export function mv(id){
    return instance({
        url:'mv/url',//搜索mv
        params:{
            id,
            
        }
    }).then(res=>{
        let obj={}
        obj.url=res.data.url
        obj.fee=res.data.fee
        obj.mvFee=res.data.mvFee
        return obj
    }).catch(err=>{
        throw err
    })
}
