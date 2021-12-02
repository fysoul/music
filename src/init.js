
import  store from './store/index'
import {recommended,getIds} from 'network/list'
import {rank} from 'network/ranking'
import {msg} from 'network/search'
import {imgload} from 'common/public'

let netImg=store.state.netImg//从store获取图片地址
let loadImg= require('assets/img/backimg/loca.jpg')//闭眼女孩
let author= store.state.author
let arr=[netImg[7],author]

//加载本地的一张背景图
function loading(img){
    let w=document.documentElement.clientWidth
     w=w<=800?'800px auto':'100% 100%'
     document.body.style.background='url('+img+') 0 0/'+w  
     
}

export default async function createMount(call){
    let time=Date.now()
     
    // document.querySelector('.cloak').style.fontSize='0px'
    
    let data=await rank()//排行榜标题
    store.dispatch('rankTitle',data)
    let ids=await getIds(data[0].id)
    let string=ids.join(',')
    Promise.all([recommended(),msg(string),imgload(arr,null,loadImg)]).then(res=>{
      
    store.dispatch('listTitle',res[0])//热门推荐
    store.dispatch('rankSings',res[1])//排行榜默认第一个歌单歌曲
      
    
    document.querySelector('.cloak').style.opacity=0
    clearInterval(document.querySelector('.cloak').dataTime)
    document.body.removeChild(document.querySelector('.cloak'))

    loading(res[2][0].src||res[2][0])
    typeof call=='function'?call():call
      console.log('初次请求数据花的时间',Date.now()-time)

    }).catch(err=>{
      createMount(call)
    })
}
  

