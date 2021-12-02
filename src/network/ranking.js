import {instance} from './request'

export function rank(){
    return instance({
        url:'toplist',
    }).then(res=>{
        let arr=[]
        let reg=/俄|vip|乡村|法国|摇滚|民谣|南语/ig

        
        res.list.forEach((el,index) => {
            //  el.name.
            let obj={}
            if(!reg.test(el.name)){
                obj.coverImgUrl=el.coverImgUrl
                obj.playCount=el.playCount
                obj.id=el.id
                obj.des=el.description
                obj.name=el.name
                obj.music=[]
            }
            
            if(obj.name){
                arr.push(obj)
            }

        });
        return arr
    }).catch(err=>{
        throw err
    })
}

