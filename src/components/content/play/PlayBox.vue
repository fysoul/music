<template>
  <div class="PlayBox clear" @click="test()" :class="{active:isActive}">

    <div class="left fl">
        <PlayLeft v-if="img&&name&&time" 
        :img="img" :name="name" :lrcText="lrcText" :time="time" :nowtime="nowtime">
        </PlayLeft>

        <PlayLeft v-else></PlayLeft>
    </div>
    
    <div class="right fr">
        <PlayRight fontColor="#0D2345" 
            @before='before'
            @toggle='toggle'
            @after='after'
            :isflag='isflag'
        ></PlayRight>
    </div>
    
  


    <audio 
        ref="listen"
        autoplay="false"
        
        :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`" 
         >
            <!-- Your browser does not support the
            <code>audio</code> element. -->
    </audio>

     <Toast v-show='isLrc' :toast="{
      'width':300,
      'height':500,
      'bottom':100,
      'right':0,
      'child':50
    }" :arrLrc='lrcArr'></Toast>
  </div>
</template>

<script>
import Vue from 'vue'

import PlayLeft from './PlayLeft.vue'
import PlayRight from './PlayRight.vue'
import Toast from './../../common/toast/Toast'



import {lrc} from 'network/search'

import {getLrc} from 'common/public'

export default {
  name: 'PlayBox',
  props:{
    play_height:{
      type:String,
      default:'100rem'
    },
    play_width:{
      type:String,
      default:'100vw'
    }
  },

  provide() {
    return {
      singObj:this
    }
  },
  data () {
    return {
        img:'',
        name:'',
        lrc:'',//全部歌词
        lrcText:'',
        time:'00:00',
        id:0,
        sing:{},
        isflag:false,
        nowtime:'00:00',
        stateNumber:0,
        playIndex:-1,
        timeArr:[],
        arrIndex:0,
        lrcArr:[],
        isLrc:false,//判断是否显示歌词
        timer:0,
        interval:0,
        showlist:false,

        arr:[],//接收页面传来的数组
        isActive:false,//用于搜索页面的初始动画

        playloding:null,//开始播放提示
    };
  },
    components: {
        PlayLeft,
        PlayRight,
        Toast,
    }, 
  methods: {

    test(){
        
    },

   

    //上一曲方法
    before(res){
      this.newPlay(this.playIndex-1)
    },

    //播放暂停方法
    toggle(res){
      this.isflag=res
      if(res){
        this.$refs.listen.play() 
      }else{
       
        this.$refs.listen.pause()
      }

       let time=(this.timer-this.timeArr[this.arrIndex-1])*100/this.interval

        this.$bus.$emit('stop',{time,interval:this.interval},this.arrIndex,res)


    },

    //下一曲方法
    after(res){
      this.newPlay(this.playIndex+1)
    },
  
    //转换为字符串时间
    getTime(t){
        let m=Math.floor(t/1000/60);
        let s=Math.floor((t-m*60000)/1000)
        m=m<10?'0'+m:m
        s=s<10?'0'+s:s
        return m+':'+s
    },

      //播放歌曲
      newPlay(x){
                let number=x
                 let length=this.arr.length
                 if(this.stateNumber==0||this.stateNumber==1){
                    number=number>=length?0:(number<0?length-1:number)
                }

                if(this.stateNumber==2){
                  number=Math.floor(Math.random()*(length+1))
                }
                 let obj=this.arr[number]
               this.hasLrc(obj,number)
         
                
        },

      getMusicObj(obj){
         this.$refs.listen.pause()
         this.img=obj.img
         this.name=obj.name+'  一 '+obj.artists
         this.lrc=obj.lrc
         this.time=this.getTime(obj.duration)
         this.id=obj.id
         this.sing=obj
         
         this.isflag=true
         
         setTimeout(this.playloding, 0);

         this.$refs.listen.play()
         
      },

        hasLrc(obj,number){
             //初始化
                this.lrcText=''
                this.arrIndex=0
                this.lrcArr.length=0

                this.playloding=this.$message.loading('获取资源中...',0)

                lrc(obj.id).then(res=>{
                    obj.lrc=res.lrc.lyric
                    this.getMusicObj(obj)
                    this.playIndex=number 
                    let {timeArr,lrcArr}=getLrc(obj.lrc)
                    this.timeArr=timeArr
                    this.lrcArr=lrcArr
                    
                  }).catch(err=>{
                     this.getMusicObj(obj)
                     this.playIndex=number 
                })
        }

    },

    mounted(){
      //从search页面获取播放对象
     this.$bus.$on('changeIndex',(obj,playIndex,arr=this.$store.state.search.searchArray)=>{
       this.arr=arr
        this.hasLrc(obj,playIndex)
     })

      
       //获取播放方式
     this.$bus.$on('changeState',res=>{
        this.stateNumber=res
     })

         //播放器时间变化方法
        let el=this.$refs.listen
        this.$bus.$emit('change',(el.volume*100),'mute')
        
        el.ontimeupdate=()=>{
          let time=el.currentTime
          this.timer=el.currentTime
          let data=time*1000
          this.nowtime=this.getTime(data)
          this.$bus.$emit('change',(data/this.sing.duration)*100,'box')
          

          if(time>this.timeArr[this.arrIndex]){
               
              this.lrcText=this.lrcArr[this.arrIndex]
             this.interval=this.timeArr[this.arrIndex+1]-this.timeArr[this.arrIndex]
              this.$bus.$emit('lrcIndex',this.arrIndex,this.interval)
              this.arrIndex++
          }
       }


        

       //滑动条组件触发的事件
       this.$bus.$on('progress',(res,key)=>{
          if(key=='box'){
             let data=parseInt((res*this.sing.duration)/100000)
             if(!el.currentTime)return
             el.currentTime=data
             
            let index=this.timeArr.findIndex(item=>{
               return data<item
             })
             if(index==-1)index=this.timeArr.length-1
             this.arrIndex=index-1
          }else if(key=='mute'){
             el.volume=res/100
          }
        })

        //播放器开始播放方法
        el.onplay=()=>{

        

          //  this.lrcText=this.lrcArr[0]
        }
        
         //播放器自然播放完毕方法
        el.onended=()=>{//0正常,1循环,2随机
              let number=this.stateNumber==1?this.playIndex:this.playIndex+1
              this.newPlay(number)

             
        },

        el.onerror=()=>{
          if(this.id==0)return
          if(this.sing.fee==1){
            this.$message.error('VIP音乐',1)
          }else{
             this.$message.error('未登录/无版权',1)
          }
        },


      this.$bus.$on('checkLrc',flag=>{
        
        this.isLrc=flag
      })



    },
    created(){

       //用于搜索页面的开场动画
      this.$bus.$on('active',res=>{
        
        setTimeout(()=>{
           this.isActive=res
        },100)
      })
    }
}
</script>

<style  scoped>

.PlayBox{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
   border-top:1rem solid  rgba(230,230,230,1);
    transition: all 1s;
    position: relative;
    transform: translateY(0);
  }
  .left{
    width: 80%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .right{
    width: 20%;
    height: 100%;
     position: absolute;
    right: 0;
    top: 0;
  }

  .active{
       transform: translateY(100%);
    }
</style>