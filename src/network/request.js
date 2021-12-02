import axios from 'axios'
import {message} from 'ant-design-vue';

export function instance(data){ 
    const instance = axios.create({
        
        baseURL:'http://47.108.193.75:3000/',//https://163.lpddr5.cn,//其它人的https://autumnfish.cn
        // https://cloud-music-api-two.vercel.app
        timeout:5000
    })

    // axios.interceptors是全局拦截
    instance.interceptors.request.use(config=>{
        return config
    })

    instance.interceptors.response.use(res=>{
            return res.data.result||res.data.songs||res.data
            
    },err=>{
        
        if(err.message.indexOf('timeout')!=-1){
           message.error('请求超时',1)
        }
        throw err
    })
    return instance(data)//axios本身返回的就是promise风格,就可以用then
}

