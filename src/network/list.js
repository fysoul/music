
import {instance} from './request'


//推荐歌单
export function recommended(){
    return instance({
        url:'personalized',
        params:{
            limit:30,
            
        }
    }).then(res=>{
        
        let  object={}
        let arr=[]

        res.forEach(el => {
          let obj={}
           obj.author=el.copywriter//歌单作者
           obj.img=el.picUrl//封面
           obj.id=el.id//歌单id
           if(el.playCount>=10000){
              el.playCount=(el.playCount/10000).toFixed(1)+'万'
           }
           obj.counts=el.playCount//歌单播放量
           obj.title=el.name//歌单标题
           obj.des=''//歌单描述

           arr.push(obj)
        });

        // let total=res.total>=100?100:(res.total?res.total:res.length)
        let total=res.total?res.total:res.length
        object.music=arr
        object.total=total
        object.title='推荐'
        return object
    }).catch(err=>{
        throw err
    })
}

//歌单分类
export function catlist(){
    return instance({
        url:'playlist/catlist',
        
    })
}

//热门歌单
export function hot(){
    return instance({
        url:'playlist/hot',
        
    })
}

//网友歌单
export function net({limit,order,offset,cat}){
    return instance({
        url:'top/playlist',
        params:{
            limit,
            order,//new,hot(new会失效)
            offset,
            cat,
            
            // cat:'古风'// " 华语 "、" 古风 " 、" 欧美 "、" 
        }
    }).then(res=>{
            let arr=res.playlists.map(item=>{
                let obj={}
                let {id,name,playCount,coverImgUrl,description,creator}=item
                obj.id=id,
                obj.author=creator.nickname
                if(playCount>=10000){
                  playCount=(playCount/10000).toFixed(1)+'万'
                }
                obj.counts=playCount
                obj.img=coverImgUrl
                obj.title=name
                obj.des=description
                return obj
              })
            // let total=res.total>=100?100:(res.total?res.total:res.length)
            let total=res.total?res.total:res.length
              //返回处理后的对象
            let object={}
             object.title=cat,
             object.total=total
             object.music=arr
            return object
    }).catch(err=>{
       throw err
    })
}





export function getIds(id){
    return instance({
        url:'playlist/detail',
        params:{
            id,
        }
    }).then(res=>{
        let arr=res.playlist.trackIds.length
        res.playlist.trackIds.length=arr>=100?100:arr//限制大量数据
       let data=res.playlist.trackIds.map(item=>{
            return item.id
        })
        return data
    }).catch(err=>{
        throw err
    })
}

// 6827562995
// http://localhost:3000/top/playlist?limit=10&order=hot

//http://localhost:3000/playlist/detail?id=6827562995获取歌单内的歌曲不过只有id用song/detail在进行

