<template>
  <div class="box">
    <div class="list">
        <like-list  :listName='getName' 
         @getSing='getsing' @sendIndex='getIndex'
        @change="change"/>
        <!--   -->
    </div>

    <div class="music">

      <div class="showbox">
         <ShowMusicBox :singObj='title' singh='40rem'  :keys='keys'>
            
              {{title.operation}}
         </ShowMusicBox>
      </div>

      <div class="sing  roll" >

        <!-- <template v-if="dataArr[number].music<=0">
            <div  class="tem">
             <a-empty />
            </div>
        </template>

        <template v-else> -->
             <ShowMusicBox class="singHover" v-for="(item,index) in dataArr[number].music" :key="index"
              :singObj='item'  singh='40rem' :border='true' 
               :index='index+1' :keys='keys'  @dblclick.native="sendObj(item,index,dataArr[number].music)">

                <span class='iconfont icon-xz3 size' @click="sendadd(item)"></span>  
                <span class='iconfont icon-xz size' @click="download(item)"></span>
              </ShowMusicBox>
        <!-- </template> -->
              
      </div>
    </div>
     
  </div>
</template>

<script>

import ShowMusicBox from 'components/content/search/ShowMusicBox'
import LikeList from 'components/content/like/LikeList'
export default {
  name: 'Like',
  data() {
    return {
       keys:['name','artists','album','textime'],
       title:{name:'歌曲',artists:'歌手',album:'专辑',textime:'时长',operation:'操作'},
       dataArr:[],
       number:0,
       time:0,//记录定时器
       isloading:false,
       loadingTime:0,//是否处于加载时间
    }
  },

  components:{
    ShowMusicBox,
    LikeList
  },
  computed:{
     getName(){
       if(this.dataArr.length>0){
            return this.dataArr.map(item=>{
              return item.name
            })
       }
      
     }
  },

  methods:{

       //发送收藏的方法
       sendadd(data){
          // this.islike=!this.islike
           this.$bus.$emit('addLike',true,data)
        },

       //从likelist获取index
        getIndex(index){
          
           if(index==this.number)return
           
            this.time=this.$message.loading('数据加载中...',0)

             if(this.loadingTime)clearTimeout(this.loadingTime)
           this.loadingTime=setTimeout(()=>{
               this.number=index
            },this.dataArr[index].music.length)
           
        },
        getsing(res){
           this.dataArr.push(res)
        }, 

        sendObj(obj,index,arr){//发送一个对象  
          this.$bus.$emit('changeIndex',obj,index,arr)
       },

       //接收likelist组件传来的更新数据
       change(res,index){
          if(typeof res=='string'){
             this.dataArr[index].name=res  
          }else if(typeof res=='object'){
              if(res.type=='up'){
                let data1=this.dataArr[index]
                let data2=this.dataArr[index-1]
                this.dataArr.splice(index-1,2,data1,data2)
              }else{
                let data1=this.dataArr[index]
                let data2=this.dataArr[index+1]
                this.dataArr.splice(index,2,data2,data1)
              }
          }else{
            this.dataArr.splice(index,1)
          }
       }


  },

  watch:{
     dataArr: {
      handler() {//newName, oldName
       if(this.dataArr.length<=0)return
        let string=JSON.stringify(this.dataArr)
        localStorage.setItem('dataArr',string);
        this.number=this.number>=this.dataArr.length-1?this.dataArr.length-1:this.number
      },
      immediate: true,
      deep:true
    }
  },

    beforeUpdate() {
      setTimeout(this.time,0)
    },

  created() {

      this.$bus.$on('updatelike',data=>{
        this.dataArr=data
      })

    //请求本地存储的数据
    
        let data=localStorage.getItem('dataArr')
        if(!data||data.length<=0){
            this.dataArr=[{name:'试听列表',id:0,music:[]}, 
            {name:'我的收藏',id:1,music:[]},
            {name:'银河光子龙',id:2,music:[]}]
        }else{
           this.dataArr=JSON.parse(data)
        }
  },

} 
</script>

<style scoped>
    .box{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      position: relative;
    }
    .list{
       width: 20%;
        height: 100%;
        position: absolute;
        left:0;
        top: 0;
        z-index:9;
    }
    .music{
      width: 80%;
       height: 100%;
       position: absolute;
       right: 0;
       top: 0;
    }

  .singHover:hover{
      background: rgba(48,72,98,.5);
  }

  .showbox{
    height: 40rem;
    border-bottom: 1rem solid rgba(48,72,98,1);
  }

  .roll{
     width: 100%;
     height: calc(100% - 40rem);
     /* box-shadow: 0rem 0rem 20rem 10rem #0D2345 inset; */
     overflow: auto;
     box-sizing: border-box;
     border-left: 1rem solid rgba(48,72,98,1);
  }

  .roll::-webkit-scrollbar{
    width: 10rem;
    height: 1rem;
  }
  .roll::-webkit-scrollbar-thumb{
    border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background:  white;
  }

  .roll::-webkit-slider-runnable-track{
     border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: #ededed;

  }

  .size{
  display: inline-block;
  width: calc(100% / 3);
  height: 100%;
  font-size: 22rem;
  text-align: center;
}

.size:hover{
  cursor: pointer;
   background:rgba(48,72,98,.2);
}
/* 
 .tem{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
} */


</style>


