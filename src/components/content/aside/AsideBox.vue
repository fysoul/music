<template>
  <div class="AsideBox" :style="{height:aside_height,width:aside_width}">
    <div class="first">
        <img  class="authorImag" 
      :src="img" 
      :style="authorImag">
    </div>
    
    <div class="second">
      <slot></slot>
    </div>

    <div class="three">
      <div class="login" @click="login">登录</div>
      <div class="logout" @click="login">注销</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideBox",
  props:{
    aside_height:{
      type:String,
      default:'100vh'
    },
    aside_width:{
      type:String,
      default:'200rem'
    }
  },
  data () {
    return {
       img:require('./../../../assets/img/aside/qyc.png')
    };
  },
  components:{

  },
  methods: {
     login(){
       this.$message.warning('暂未开放',1)
     }
  },
  computed:{
    authorImag(){
      let imgSize={}
      imgSize.height='calc('+ this.aside_width+' / 2)'
      imgSize.width='calc('+ this.aside_width+' / 2)'
      return imgSize
    }
  },
}
</script>

<style  scoped>
@import '~assets/css/variable.css';

     .AsideBox{
         overflow: hidden;
         position:fixed;
         top: 0;
         left: 0;
     }

     .first{
       width: 100%;
       height: 140rem;
       overflow:hidden;
       display: flex;
       justify-content: space-around;
       align-items: center;
     }
     
     .second{
       width: 100%;
       height:calc(100% - 240rem);
     }


     .three{
       width: 100%;
       height: 100rem;
       display: flex;
     }

     .first .authorImag{
         border-radius:50%;
        vertical-align: middle;
     }

     .first .name{
       height: 80%;
       text-align: center;
       white-space: nowrap;
     }

     .login,.logout{
       width: 50%;
       height: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
     }

     .login:hover,.logout:hover{
          cursor: pointer;
     }
</style>