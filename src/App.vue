<template>
<!-- 该div会替换ID为app的div -->
<div class="main">
   <template>
          <div class="tabBox">
        <TabBar></TabBar>
     </div>
   
   <div class="router_box">
      <!-- <keep-alive exclude="ListChild,Down">
          <router-view></router-view>
      </keep-alive> -->

      <transition name="slide">
         <keep-alive exclude="ListChild,Down">
           <router-view></router-view>
         </keep-alive>
      </transition>

   </div>
   
   <AsideBox aside_height='100vh' aside_width='200rem'> 
      <AsideTemplate  path='/search'>
           <i class="iconfont icon-search" slot="icons"></i>
           <span slot="content">搜索</span>
        </AsideTemplate>

         <AsideTemplate  path='/list'>
           <i class="iconfont icon-gd" slot="icons"></i>
           <span slot="content">歌单</span>
        </AsideTemplate>
        <AsideTemplate path='/like'>
           <i class="iconfont icon-like" slot="icons" ></i>
           <span slot="content">列表</span>
        </AsideTemplate>

        <AsideTemplate path='/ranking'>
           <i class="iconfont icon-phb" slot="icons" ></i>
           <span slot="content">排行榜</span>
        </AsideTemplate>

        <AsideTemplate path='/down'>
           <i class="iconfont icon-xz" slot="icons" ></i>
           <span slot="content">下载</span>
        </AsideTemplate>    
   </AsideBox>

   <div class="tabBox">
      <PlayBox></PlayBox>
   </div>
   <Card/>
</template>

    

</div>
   
</template>

<script>

import AsideBox from 'components/content/aside/AsideBox'
import AsideTemplate from 'components/content/aside/AsideTemplate'
import TabBar from 'components/content/tabBar/TabBar'
import PlayBox from 'components/content/play/PlayBox'//播放组件
import LuoPan from 'components/common/LuoPan'
import Card from 'components/common/toast/Card.vue'
export default {
  name: 'App',

   data(){
     return {
     }
  },
  components: {
     AsideBox,
     AsideTemplate,
     TabBar,
     PlayBox,
     LuoPan,
     Card,
  },
}
</script>

<style>
/* 全局样式 */
    .main{
       width: 100%;
       height: 100%;
    }
   .clear::after{
      content: '';
      display: block;
      clear: both;
   }
   .fl{
     float: left;
   }

   .fr{
     float: right;
   }

    .box{
       /* 避免路由页面外边距穿透? */
      overflow: hidden;
    }

    .router_box{
       width: calc(100% - 200rem);
       height: calc(100% - 180rem);
       margin:0rem 200rem 0rem;
       background: rgba(0, 0, 0,.4);
    }

    .tabBox{
       height:100rem;
       width:calc(100% - 200rem);
       margin:0rem 200rem 0rem;
       background: rgba(0, 0, 0,.4);
    }

    .tabBox:nth-child(1){
       height:80rem;
    }


   .slide-enter-active,.slide-leave-active{
    transition: all .3s;
   }
   .slide-enter,.slide-leave-to{
    transform: translateX(100%);
   }

    
  


</style>
