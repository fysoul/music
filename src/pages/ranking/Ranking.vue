<template>
  <div class="box">
    <div class="list">
        <like-list  
          @sendIndex='getIndex' :listName='getName' :contr='false'
         />
    </div>

    <div class="music">

      <div class="showbox">
         <ShowMusicBox :singObj='title' singh='40rem'  :keys='keys'>
            
              {{title.operation}}
         </ShowMusicBox>
      </div>

      <div class="sing  roll" >

             <ShowMusicBox class="singHover" v-for="(item,index) in dataArr[number].music" :key="index"
              :singObj='item'  singh='40rem' :border='true' 
               :index='index+1' :keys='keys'  @dblclick.native="sendObj(item,index,dataArr[number].music)">

                <span class='iconfont icon-xz3 size' @click="sendadd(item)"></span>  
                <span class='iconfont icon-xz size' @click="download(item)"></span>
              </ShowMusicBox>
              
      </div>
    </div>
     
  </div>
</template>

<script>
  
import ShowMusicBox from 'components/content/search/ShowMusicBox'
import LikeList from 'components/content/like/LikeList'
import {rank} from 'network/ranking'
import {getIds} from 'network/list'
import {msg} from 'network/search'
import {getTime} from 'common/public'

export default {
  name: 'Ranking',
  data() {
    return {
       keys:['name','artists','album','textime'],
       title:{name:'歌曲',artists:'歌手',album:'专辑',textime:'时长',operation:'操作'},
       dataArr:[{music:[]}],
       number:0,
       time:0,//记录定时器
       isloading:false,
       loadingTime:0,//是否处于加载时间
       test:[],
    }
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

  components:{
    ShowMusicBox,
    LikeList
  },


  methods:{
       //发送收藏的方法
       sendadd(data){
           this.$bus.$emit('addLike',true,data)
        },

       //从likelist获取index
        async getIndex(index){
          if(index==this.number)return
          this.time=this.$message.loading('数据加载中...',0)
            if(this.dataArr[index].music.length>0){ 
              this.number=index
              setTimeout(this.time,0)
               return
            }

            let  ids=await getIds(this.dataArr[index].id)
            let  string=ids.join(',')
           
            let  music=await msg(string)
             this.getmusic(music,index)
             this.number=index
             setTimeout(this.time,0)  
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
       },

       //获取歌曲
       getmusic(arr,index){
          arr.forEach(el => {
                 let obj={}
                    obj.name=el.name//歌名
                    obj.artists='' //艺术家
                    obj.id=el.id,//歌名的id
                    obj.fee=el.fee//收付费
                    obj.mvid=el.mv//mv
                    obj.album=el.al.name//专辑
                    obj.duration=el.dt//时间
                    obj.textime=getTime(el.dt) //文本时间
                    obj.img=el.al.picUrl //封面
                    obj.lrc=''

                   el.ar.forEach((element,number) => {
                        let fu='/'
                        if(el.ar.length-1==number){
                             fu=''
                        }
                        obj.artists+=element.name+fu
                    });
                this.dataArr[index].music.push(obj)
          });
       }


  },

  beforeUpdate() {
    setTimeout(this.time,0)
  },

 
 async created() {
       
     //从store中取出
     this.dataArr=this.$store.state.rank
     this.getmusic(this.$store.state.rankSings,this.number)


    //  this.time=this.$message.loading('数据加载中...',0)
    //  let  getArr=await rank()
    //  this.dataArr=getArr
    //  let  ids=await getIds(getArr[this.number].id)
    //  let  string=ids.join(',')
    //  let  music=await msg(string)
    //  this.getmusic(music,this.number)
    //  setTimeout(this.time,0)

     


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
    background: white;
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
</style>


