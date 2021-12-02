<template>
  <div class="PlayRight">
     <span class="iconfont icon-beforesong" title="上一曲" @click="before"></span>
     <span class="iconfont" :class="{'icon-stop':isflag,'icon-start':!isflag}"  title="暂停/开始"  @click="toggle"></span>
     <span class="iconfont icon-nextsong"  title="下一曲"  @click="next"></span>
  </div>
</template>

<script>
export default {
  name: 'PlayRight',
  props:{
    isflag:{
      type:Boolean,
      require:true
    }
  },
  data () {
    return {
      //  isflag:false
    };
  },
  methods: {
       before(){
          this.$emit('before',-1)
       },
       toggle(){
         let flag=!this.isflag
          this.$emit('toggle',flag)
       },
       next(){
          this.$emit('after',1)
       }
    },
  components: {

    },
}
</script>

<style  scoped>
 .PlayRight{
   width: 100%;
   height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

     position: absolute;
      left: 0;
      top: 0;
}
</style>