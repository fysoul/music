<template>
  <div class="Card" :style="obj1"  @click="sendMsg(msg)">
     <img v-if="msg.img" :style="obj2" :src="msg.img"/>
     <div class="content" :style="obj3">
         <div class="del">{{msg.title}}</div>
         <div class="number"></div>
         <div class="number">{{msg.counts}}</div>
         <div class="number">{{msg.author}}</div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props:{
      w:{
          type:Number,
          default:320
      },
      h:{
          type:Number,
          default:100
      },
      msg:{
          type:Object,
          require:true
      }
      
  },
  data () {
    return {
        width:this.w,
        height:this.h,
        img:''
    };
  },
  methods: {
       sendMsg(msg){
         this.$emit('getMsg',msg)
       }
    },
  components: {
      
    },

    computed:{
           obj1(){
            return {
                width:this.width+'rem',
                height:this.height+'rem',
            }
        },

        obj2(){
           return {
                width:this.height+'rem',
                height:this.height+'rem',
                 borderRadius:'5rem',
            }
        },

         obj3(){
           return {
                width:'calc(100% - '+this.height+'rem)',
                // height:this.height+'rem',
            }
        },


    }
}
</script>

<style  scoped>
 .Card{
    display: flex;
    flex-wrap: nowrap;
     opacity: 1;
     transition: all 200ms;
}

.Card:hover{
    opacity: .8;
}

.content{
    padding: 0rem 10rem;
    height: 100%;
}

.del{
    width: 100%;
    height: 40%;
    line-height: 20rem;
     font-size: 17rem;
     font-weight: 520;
     /* color: #2e2e2e; */

     letter-spacing: 1rem;
    overflow: hidden;
}

.number{
    width: 100%;
    height: 20%;
    font-size: 16rem;
    line-height: 20rem;
    /* color: #8e8e8e; */
    color: rgba(240, 240,240, .5);
    vertical-align: bottom;
}
</style>