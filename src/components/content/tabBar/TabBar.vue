<template>
  <div class="TabBar">
    <div class="left">
      <TopBarLeft></TopBarLeft>
    </div>
    
    <div class="middle">{{errorMsg}}</div>
    <div class="right">
       <TopBarRight></TopBarRight>
    </div>
     
  </div>
</template>

<script>
import TopBarLeft from './TopBarLeft.vue'
import TopBarRight from './TopBarRight.vue'

export default {
  name: 'TabBar',
  props:{
    tab_height:{
      type:String,
      default:'100rem'
    },
    tab_width:{
      type:String,
      default:'100vw'
    }
  },
  data () {
    return {
        errorMsg:''
    };
  },
  components: {
    TopBarLeft,
    TopBarRight

    },

    // methods:{
    //   geterror(res){
    //     this.errorMsg=res
    //   }
    // },
}
</script>
 
<style  scoped>
    .TabBar{
    width:100%;
    height:100%;
    display: flex;
    justify-content:space-around;
    align-items: center;
    
    }

    .left{
      width: 40%;
      height: 40rem;
    }
    .right{
      width: 15%;
     height: 40rem;
     transform: translate(30%,-40%);
    }

    /* .middle{
      position: relative;
      z-index: 777;
      font-size: 12px;
       width: 15%;
       height: 40rem;
       line-height: 40rem;
       color: rgba(240, 240, 240, .8);
    } */
</style>

