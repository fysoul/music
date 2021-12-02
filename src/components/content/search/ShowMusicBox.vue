<template>
  <div class="ShowMusicBox"  :style="{borderBottom:border?'1rem solid rgba(48,72,98,.4)':'none'}">
      <div class="sing" :style="{width:flex[0],height:singh,lineHeight:singh}">{{index}}</div>
      
      
      <div class="sing" v-for="(item,index) in keys" :key="item" :style="{width:flex[index+1],height:singh,lineHeight:singh}">
           
           
           <template v-if="item=='name'&&singObj.name!='歌曲' ">
              
              <span class="fl">{{singObj[item]}}</span>
             <div class="contr">
              <template v-if="singObj.fee==1">
                  <span class="free">fre</span>
              </template>

              <template v-if="singObj.mvid!=0">
                  <span class="mv icon-mv iconfont" @click.stop="playmv(singObj.mvid)"></span>
              </template>
               
               <template v-if="singObj.down">
                  <span class="xz icon-zq1 iconfont"></span>
              </template>
             </div>
               
           </template>

           <template v-else>
               {{singObj[item]}}
           </template>
      </div>

      <div class="sing font" :style="{width:flex[flex.length-1],height:singh,lineHeight:singh}">
            <slot></slot>       
      </div>

      <div class="mvbox" ref="mvplaybox" :style="{transform:mvshow?'translateX(0)':'translateX(100%)'
      }" @mousemove="showMask">
         <video controls ref="mv" @dblclick.prevent="videoScreenFull()">
            <!-- :poster="require('./../../../assets/img/root_background/37.jpg')" -->
           <!-- <source ref="mv" src="myVideo.mp4" type="video/mp4"> -->
         </video>

         <div class="mask" ref="mask"  :class="{maskhide:isshow}">
            <span @click.stop="shots">截图</span>
            <span @click.stop="videoScreenFull()">{{isfull?'还原':'全屏'}}</span>
            <span @click.stop="close()" :style="{background:isfull?'#8e8e8e':'white',
            cursor:isfull?'auto':'pointer'}">关闭</span>

            <div class="clear" @click="closefull">
              <span class="iconfont icon-fx fl"></span>
              <span class="iconfont icon-fx fr"></span>
            </div>
         </div>

         <div class="maskScreen"></div>
         <div class="maskfull" @click.stop="videoScreenFull()">
         </div>
      </div>
  </div>
</template>

<script>
 
 import {mv} from 'network/search'
 import screenfull from 'screenfull'

export default {
  name: 'ShowMusicBox',
  props:{
      border:{
        type:Boolean,
        default:false
      },
      singh:{
          type:String,
          default:'40rem'
      },
      singObj:{
           type:Object,
          default(){
              return {}
          }
      },
      index:{
        default:''
      },
      keys:{
          type:Array,
          default(){
              return []
          }
        //   require:true
      }

  },
  data () {
    return {
        singnumber:0,
        islike:false,
        mvshow:false,
        isfull:false,//是否充满全屏
        isActive:true,//显影
        isshow:false,
        daley:true,//mvbox的鼠标移动的延迟
        
    };
  },
  methods: {
         flexw(){
            
        },

        //截图
        shots(){
          this.$message.info('暂未开放',1)
        },

        //全屏吗mv
        videoScreenFull(){
          if (!screenfull.enabled) {
            this.$message.error('浏览器不支持',1);
            return false
          }
           screenfull.toggle(this.$refs.mvplaybox)
          this.isfull=!this.isfull
        },

        //关闭mv
        close(){
          if(this.isfull){
            return
          }
          this.mvshow=false
          let el=this.$refs.mv
          el.pause()
        },

        async playmv(mvid){
          let timer=null
            try{
              timer=this.$message.loading('正在连接',0)
              let obj=await mv(mvid)
              this.mvshow=true
              let el=this.$refs.mv
              el.src=obj.url
              el.play()
              setTimeout(timer,0)
            }catch{
              setTimeout(timer,0)
              this.$message.error('未登录/付费MV',1)
            }
        },

        sendadd(){
          this.islike=!this.islike
          this.$bus.$emit('addLike',this.islike)
        },

        //隐藏标题
        closefull(){
           this.isshow=!this.isshow
           this.daley=true
        },

        //移动到指定位置显示
        showMask(e){
          let h=Math.floor(e.offsetY*100/this.$refs.mvplaybox.clientHeight)
          let w=Math.floor(e.offsetX*100/this.$refs.mvplaybox.clientWidth)
          if(h<15&&w<30){
            if(this.daley)return
            this.isshow=false
            
          }else{
             this.daley=false
          }
        }

        

    },

    created(){
      this.isActive=false
    }
     
}
</script>

<style  scoped>

.ShowMusicBox{
      display: flex;
  }

.sing:nth-child(1){
      text-align: center;
  }
.sing{
  padding:0 10rem;
  overflow: hidden;
  vertical-align: middle;
}

  .font{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
  }

/* mv */
.mv,.xz{
  color: red;
  font-size: 22rem;
  margin-left:5rem;
  line-height: 20rem;
}
 
 .xz{
   color: seagreen;
 }

 .free{
   
   padding: 0 5rem;
   border-radius: 5rem;
   height: 50%;
   font-size: 14rem;
   margin-left: 5rem;
   background: rgba(46, 139, 87, 1);
   color: white;

   display: flex;
   justify-content: center;
   align-items: center;
 }

 .contr{
   width: 100rem;
   height: 100%;
   float: left;
   display: flex;
   justify-content: center;
   align-items: center;
 }

 .contr:hover .mv{
   cursor: pointer;
 }

 /* .mv:hover,.xz:hover,.free{

 } */

 .mvbox{
   position: fixed;
   top: 0;
   right: 0;
   left: 200rem;
   bottom: 100rem;
   margin: auto;
   z-index: 888;
   overflow: hidden;
   background: rgba(0, 0, 0, 1);
   transition: all 300ms linear;
   
 }
 video{
   width: 100%;
   height: 100%;
   object-fit: fill;
 }


 
.mask{
  
     width: 28%;
    height: 12%;
    border-top-left-radius:10rem ;
    border-top-right-radius:10rem ;
    position: absolute;
    left: 1.5%;
    top:2.5%;
    background: rgba(240, 240, 240, 1);
    z-index: 889;
    color: black;
    transition: all 300ms;
}

.mask div{
  width: 100%;
  height: 40%;
  background: #8e8e8e;
}
.mask div span{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width:10%;
  height: 100%;
  min-width: 20rem;
  min-height: 20rem;
  vertical-align:top;
  font-size: 20rem;
  color: white;
 
}
.mask div span:nth-child(1){
  transform: rotate(180deg);
   margin-left: 10rem;
}
.mask div span:nth-child(2){
  margin-right: 10rem;
}

.mask>span{
    background: white;
    width: calc(100% / 3);
    height: 60%;
    vertical-align: middle;
    text-align: center;
    display:inline-flex;
    justify-content: center;
    align-items: center;
}

.mask>span:first-child{
     border-top-left-radius: 10rem;
}
.mask>span:nth-child(3){
     border-top-right-radius: 10rem;
}

.mask>span:hover{
    cursor: pointer;
   /* background: rgba(48,72,98,.5); */
}
.mask div:hover{
  cursor: pointer;
  opacity: .5;
   /* background: rgba(48,72,98,.5); */
}

.maskfull{
  width:58rem;
  height: 48rem;
  position: absolute;
  bottom: 24rem;
  right: 45rem;
}

.maskScreen{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
}

.maskhide{
  height:0;
  width: 0;
  top:8.5%;
  left: 15.5%;
  overflow: hidden;
}
</style>