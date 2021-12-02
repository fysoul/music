<template>
  <div class="AsideTemplate" @click="togglePage" :style="getActiveColor" ref="size">
      <div class="line" :class="{lineActive:isactive}"></div>
      <div class="icons"><slot name="icons"></slot></div>
      <div class="content" ref="test"><slot name="content"></slot></div>
  </div>
  
</template>

<script>
export default {
  name: 'AsideTemplate',
  props:{
      activeColor:{
          type:String,
          default:'linear-gradient(90deg,rgba(48,72,98,.5),white)'
    },
    path:String
  },
  data () {
    return {
        colorObj:{},
        loading:0,
        isSelect:false
    };
  },
  methods: {
       async togglePage(){
        await this.$router.push(this.path).catch(err=>err);
      },
  },
  computed:{
     isactive(){
        return this.$route.path.indexOf(this.path)!=-1
     },
      getActiveColor(){
        let obj={}
        if(this.isactive){

              obj.background=this.activeColor
              
              obj.color='rgba(48,72,98,1)'
              return obj
          }else{
 
          }
         
          return obj

      }
  },
  
}
</script>

<style  scoped>

@import '~assets/css/variable.css';
.line{
  transition: all 500ms;
  width:0;
  height: 2rem;
   background: white;
}

.lineActive{
  width: 100%;
  height: 2rem;
   background: rgba(48,72,98,1);
}



.AsideTemplate{
    width: 160rem;
    height: 50rem;
    margin: 0rem auto 10rem auto;
    padding: 5rem 10rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-radius: 10rem;
    background: transparent;
    transition: transform 500ms linear;
   
}

.AsideTemplate:hover .line{
  width: 100%;
}

.AsideTemplate:hover{
    cursor: pointer;
    background:linear-gradient(90deg,rgba(255,255,255,.3),rgba(48,72,98,.3));
}

.content{
  margin-left: 5rem;
  white-space: nowrap;

}



</style>