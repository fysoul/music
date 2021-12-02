<template>
  <div class="TopBarRight" :class="{active:isActive}">
    <span class="icon-hy iconfont font"  v-if="!isflag" @click="clickFullscreen"></span>
    <span class="icon-qp iconfont font" v-else @click="clickFullscreen"></span>
    <span class="icon-hf iconfont font" @click='change'></span>  
    <span class="icon-sz iconfont font" @click="msgError"></span>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import {random} from 'common/public'
export default {
  name: 'TopBarRight',
  data () {
    return {
        isFullscreen:false,
        isflag:false,
          netImg:this.$store.state.netImg,//从store获取图片
          isActive:false,
          ran:7,
    };
  },
  methods: {

    clickFullscreen(){
      if (!screenfull.enabled) {
          return false
        }
        screenfull.toggle();
        this.isFullscreen=true
        this.isflag=!this.isflag
      },

    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
      if (isFull === undefined) {
          isFull = false;
      }
      return isFull;
     },

      msgError(){
         this.$message.warning('暂未开放',1);
      },

      //换肤
      change(){
        let toggle=this.$message.loading('切换背景中...',0)
         let number=random(null,this.netImg.length-1,this.ran)
         let img = new Image();
         img.src = this.netImg[number];

         let w=document.documentElement.clientWidth
          w=w<=800?'800px auto':'100% 100%'

         

         //成功加载的时间
         img.onload=()=>{
             let w=document.documentElement.clientWidth
              w=w<=800?'800px auto':'100% 100%'
              document.body.style.background='url('+this.netImg[number]+') 0 0/'+w
              this.ran=number
              setTimeout(toggle,0)    
         }
         
         //加载失败
         img.onerror=()=>{
           this.$message.warning('休息一下再来',1)
              document.body.style.background='url('+this.netImg[7]+') 0 0/'+w
              this.ran=7
              setTimeout(toggle,0)       
         }

      }
},
    mounted(){

       window.onresize = () => {
        // 全屏下监控是否按键了ESC
        if (!this.checkFull()) {
          // 全屏下按键esc后要执行的动作
          this.isFullscreen = false;

         }
      }

     
  },

  created() {
     //用于搜索页面的开场动画
      this.$bus.$on('active',res=>{
        setTimeout(()=>{
           this.isActive=res
        },100)
     })
    
  },


}
</script>

<style  scoped>

    .TopBarRight{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items:center;
        transition: all 1s;
        transform: translateX(0);
    }

    .font{
       font-size: 26rem;
    }

    .font:hover{
      cursor: pointer;
    }

    .active{
       transform: translateX(110%);
    }
</style>