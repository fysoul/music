<template>
  <div class="Title">
    <div class="content" :style="obj1">
        <div class="text" v-for="(item,index) in text" :key="index" ref="test"
          @click="check(index)">
               
               
              <template v-if="slotNumber==index">
                    <slot></slot>
              </template>

              <template v-else>
                  {{item}}
                  <div  class="zw one" :style="{width:(index==isNumber?0:'calc(50% + 2rem)')}"></div>
                  <div class="zw two" :style="{width:(index==isNumber?0:'calc(50% + 2rem)')}" ></div>
              </template>
         </div>





    </div>
    <div class="empty" :style="obj2"></div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props:{
    text:{
      type:Array,
      default(){
        return []
      }
    },
    slotNumber:{
      type:Number,
      // default:-1,
    },
    number:{
      type:Number,
      default:0
    }
  },
  data () { 
    return {
       ischeck:false,
       isNumber:this.number,
       styleObj:{}
    };
  },
  computed:{
    obj1(){
      return {
         width:this.text.length*100+'rem'
      }
    },

    obj2(){
      return {
         width:'calc(100% - '+this.text.length*100+'rem)' 
      }
    }
  },
  methods: {
       check(index){
        
          this.isNumber=index
         

          let el=this.$refs.test
          for(let i=0;i<el.length;i++){
            el[i].style.borderColor='rgba(230, 230, 230,.5)'
          }
          if(index!=0){
            el[index-1].style.borderRightColor='white'
          }
          el[index].style.borderColor='white'


           this.$emit('getNumber',index)
       },

       
    },
  components: {

    },

    created() {
      
    },

    mounted(){
          this.check(this.isNumber) 
    }
}
</script>

<style  scoped>


 .Title{
    width: 100%;
    height: 100%;
    
}

.Title::after{
  content: '';
 display: block;
 clear: both;
}


.content{
    height: 40rem;
    float: left;
    line-height: 40rem;
    text-align: center;
    box-sizing: border-box;
    
}
.empty{
    float: left;
    height: 40rem;
    border-bottom:2rem solid white;
}
.text{
    position: relative;
    width: 100rem;
    height: 40rem;
    border-right:2rem solid white;
    border-top:2rem solid white;
    float: left;
    /* overflow: hidden; */
    font-size: 17rem;
}

.text:hover{
    cursor: pointer;
}

.text .zw{
    height: 100%;
    /* rgba(117, 152, 189, 1); */
    border-bottom:2rem solid white;
    transition: width 500ms
}
.text .one{
    position: absolute;
    top: 0;
    left: -2rem;
}
.text .two{
    position: absolute;
    top: 0;
    right: -2rem;

}

.text:last-child{
    border-top-right-radius: 10rem;
    
}

</style>