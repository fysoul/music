<template>
  <div class="ListDes" :style="obj1">
    
    <div class='imgbox' :style="obj2">
         <img class='img' v-if="obj.img" :src="obj.img" />
         <div class="po">{{obj.counts}}</div>
    </div>
    <div class="box" :style="obj3">
        <h4>{{obj.title}}</h4>
        <div class="content">
            {{obj.des||obj.author}}
        </div>
    </div>
    <div class="contr">
            <span @click="sendState(0)">收藏</span>
            <span @click="sendState(1)">播放</span>
            <span @click="sendState(2)">返回</span>
    </div>
  </div>
</template>

<script>



export default {
  name: 'ListDes',
  props:{
      w:{
          type:String,
          default:'100%'
      },
      h:{
          type:Number,
          default:80
      },
      obj:{
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
  computed:{
           obj1(){
            return {
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
                width:'calc(100% - '+(this.height+210)+'rem)',
            }
        },



    },
  methods: {
       sendState(index){
          this.$emit('sendIndex',index)
       }
    },
}
</script>

<style  scoped>
 .ListDes{
   width: 100%;
}

 .ListDes::after{
     content: '';
     display: block;
     clear: both;
 }

.imgbox{
    float: left;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.img{
    width: 100%;
    height: 100%;
}
.imgbox .po{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20rem;
    background: rgba(0, 0, 0, .3);
    color: white;
    font-size: 16rem;
    line-height: 20rem;
    text-align: right;
}


.box{
    float: left;
    height: 100%;
    padding: 0 10rem;

}

.box h4{
   letter-spacing: 1rem;
   color: white;
}
.box .content{
    font-size: 16rem;
    line-height: 20rem;
    overflow: hidden;
   letter-spacing: 1rem;
   color: #8e8e8e;
}

.contr{
    float: left;
    width: 200rem;
    height: 40rem;
    transform: translateY(50%);
    background: rgba(48,72,98,.5);
    border-radius:5rem ;
}

.contr span{
    display: inline-block;
    width: calc(100% / 3);
    height: 100%;
    vertical-align: middle;
    text-align: center;
    line-height: 40rem;
}

.contr span:first-child{
     border-top-left-radius: 5rem;
     border-bottom-left-radius: 5rem;
}
.contr span:last-child{
     border-top-right-radius: 5rem;
     border-bottom-right-radius: 5rem;
}

.contr span:hover{
    cursor: pointer;
   background: rgba(48,72,98,.7);
}
</style>