<template>
  <div class="PlayLeftContr"  ref="font">
      <div class="contr_line">
       
        <!-- E1413C -->
         <PlayLine :disable="false" linekey="mute" :fuzzy='fuzzy' insideColor="rgb(200,200,200)"  outsideColor="red"></PlayLine>
      </div>
      <span class="iconfont icon-lrc" :class="{active:islrc}"
        title="开启歌词" @click="sendLrc"></span>
      <span class="iconfont" 
      :class="{'icon-sj':number==2,'icon-singloop':number==1,'icon-singsloop':number==0}" 
      :title="number==0?'列表播放':number==1?'单曲循环':'随机播放'"
       @click="sendState"></span>
      <span class="iconfont icon-addlike" 
         
        title="添加歌曲到" @click="addLike"></span>
  </div>
</template>

<script>
import PlayLine from './PlayLine.vue'

export default {
  name: 'PlayLeftContr',
  inject: ['singObj'],
  data () {
    return {
        fuzzy:0.5,
        number:this.stateNumber,
        islrc:this.lrc,
        islike:false
    };
  },

  props:{
    stateNumber:{
      type:Number,
      default:0
    },
    lrc:{
      type:Boolean,
      default:false
    }
  },
  methods: {
         sendState(){
           let x=this.number+1
            this.number=x>2?0:x
            this.$bus.$emit('changeState',this.number)
         },

         sendLrc(){
           this.islrc=!this.islrc
           this.$bus.$emit('checkLrc',this.islrc)
         },

         addLike(){
           this.$bus.$emit('addLike',true,this.singObj.sing)
         }
    },
  components: {
       PlayLine
    },
}
</script>

<style  scoped>
 .PlayLeftContr{
   width: 100%;
   height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.contr_line{
   width: 50%;
   height: 20%;
   margin-right:5rem;
}
 .PlayLeftContr span{
   width: 30rem;
   height: 30rem;
  display: flex;
  max-width: 15%;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  text-align: center;
  font-size: 20rem;
}

 .PlayLeftContr span:nth-child(3){
   font-size: 22rem;
 }

.active{
  color: red;
}

.likeActive{
  color: red;
}
</style>