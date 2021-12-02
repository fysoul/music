
import {instance} from './request'

//获取更详细的信息
export function detail(ids){
    return instance({
        url:'song/detail',
        params:{
            ids//如果有多个用,隔开
        }
    })
}
 
//歌词/mv/时间/歌单/歌名/付费/添加到/下载/排行榜/图片

//获取mv地址
export function detail(id){
    return instance({
        url:'mv/url',
        params:{
            id//mvid
        }
    })
}