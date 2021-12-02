import Vue from 'vue';
var mixin = {
    data() {
        return {
            locaArr:[],
            flex:['8%','25%','23%','22%','10%','12%']
        }
    },
    methods: {
        //请求本地存储的数据的下载
        getloca(){
            let data=localStorage.getItem('down')
            if(!data||data=='[]'){
                let obj={album:"李雷和韩梅梅",
                artists:"徐誉滕",
                duration:214544,
                fee:8,
                id:1493994313,
                img:"https://p1.music.126.net/IbM_m41UBL-hVBPIQ6vtRg==/109951165455256131.jpg",
                lrc:'',
                name:"天使的翅膀 Angel's Wing",
                mvid:0,
                textime:"03:34"}

                //添加到缓存中
                this.locaArr.push(obj)
                let string=JSON.stringify(this.locaArr)
                localStorage.setItem('down',string);
                

            }else{
                this.locaArr=JSON.parse(data)
            }
          },

           //下载
       async download(item){
            this.getloca()
            await new Promise((resolve,reject)=>{
            let time=this.$message.loading('模拟下载...',0)
            setTimeout(time,1500)
            setTimeout(()=>{
                resolve()
            }  
            ,2000)
            })
            this.$message.success('下载成功...',1)
            this.locaArr.push(item)
            let string=JSON.stringify(this.locaArr)
            localStorage.setItem('down',string);
        },


        //发送收藏的方法
       sendadd(data){
        this.$bus.$emit('addLike',true,data)
       },
    },

    created: function() {
        let option = this.$options.doNotInit;
        if (!option) {
            this.getloca()
        }
    },

    //失活状态????
    // deactivated(){

    //       this.$bus.$emit('active',true)
         
    // },

    
    //激活状态
    // activated(){
    //        this.$bus.$emit('active',false)
    // }


    
}
export default {
    install(Vue) {
        Vue.mixin(mixin)
    }
}
