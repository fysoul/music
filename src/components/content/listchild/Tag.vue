<template>
  <div class="Tag">
    <div class="title">{{tag.title}}</div>
    <div class="tags">
        <span v-for="(item,index) in tag.arr" :key="index" @click="sendTagMsg(index,item)">
            {{item}}
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props:{
     tag:{
         type:Object,
         require:true
     }
  },
  data () {
    return {

    };
  },
  methods: {
       sendTagMsg(index,value){
           let data=this.tag.msg[index]
           return this.$emit('sendTagMsg',index,value,data)
       }
    },
  components: {

    },
}
</script>

<style  scoped>
 .Tag{
   
}


.title{
    text-align: left;
    font-size: 16rem;
    color: silver;
    height: 40rem;
    width: 100%;
    line-height: 56rem;
}

.tags{
    overflow: hidden;
}

.tags span{
    float: left; 
    padding:0 10rem;
    background: rgba(230,230,230,1);
    margin:5rem;
    border-radius: 5rem;
    font-size: 16rem;
}

.tags span:hover{
   opacity: .7;
}
</style>