<template>
  <div class="Search">
     <div  class="tem" v-if="isluopan">
          <luo-pan @sendDestroy='sendDestroy'/>    
      </div>
     
    <div class="perch"></div>
      <div class="title" :class="{active:istitle}"> 
          <ShowMusicBox :singObj="title" singh='40rem' :keys='keys'>
            {{title.operation}}
          </ShowMusicBox>
      </div>

      <div class="rolling" :class="{rollActive:isroll==0}">

              <ShowMusicBox class="singHover" v-for="(item,index) in music" :key="(index+1)*10"
              :singObj='item'  singh='40rem' :index='index+1' :keys='keys' 
              :border='true' @dblclick.native="sendObj(item,index,$event)">
                    <span class='iconfont icon-xz3 size' @click="sendadd(item)"></span>  
                    <span class='iconfont icon-xz size' @click="download(item)"></span>
              </ShowMusicBox>

          <template v-if="music.length>=30&&total>30">
            <div class="page">
                <a-pagination v-model="current" :pageSize='30' :total="total" @change='change'/>
            </div>
              
          </template> 
          
      </div>
     
  </div>
</template>

<script>
import ShowMusicBox from 'components/content/search/ShowMusicBox'
import LuoPan from 'components/common/LuoPan'

export default {
  name: 'Search',
  data () {
    return {
        title:{name:'歌曲',artists:'歌手',album:'专辑',textime:'时长',operation:'操作'},
        music:[],
        current:1,
        keys:['name','artists','album','textime'],
        total:30,
        istotal:false,
        hide:0,//提示的标志
        playIndex:-1,
        isluopan:false,//是否显示罗盘
        istitle:false,//是否显示标题(歌名/歌手...)
        isroll:0,//

        that:null,//罗盘实列
    };
  },
  components: {
      ShowMusicBox,
      LuoPan,
  },
  methods: {
       sendObj(obj,index,e){//发送一个对象   
          if(e.target.className=='sing'||e.target.className=='sing font'||e.target.className=='fl'||e.target.className=='contr'){
            //  if(this.playIndex==index)return是否为点击的是上一次的
            //  this.playIndex=index
              this.$bus.$emit('changeIndex',obj,index)
              
          }
       },

       change(page){
          this.$bus.$emit('pageIndex',page)
       },


       sendDestroy(that){
         this.that=that
       },

      loading(res){//加载函数
          if(res){
            setTimeout(this.hide,0);
            this.$message.success('数据搜索成功',1); 
          }else{
           this.hide=this.$message.loading('正在搜索数据...', 0);
          }
      }
    },
   

    mounted(){
       
       if(this.isroll===1)this.music=this.$store.state.search.searchArray
       //随便取一个里面当前歌曲的条数
       this.$bus.$on('getCount',(res,index)=>{
           if(!this.istotal){
                this.total=res
                this.istotal=true
           }
           this.current=index
       })

       this.$bus.$on('loading',res=>{

          if(this.isroll!=1){//执行一次
             this.isroll=1
             this.that.isActive=true
              this.that.degm=360
                setTimeout(()=>{
                  // this.that.$destroy()//不能清除dom
                  this.$bus.$emit('active',false)
                  this.istitle=false
                  this.isluopan=false
                  this.music=this.$store.state.search.searchArray
                 },1000)
          }else{
            this.loading(res)
          }

          

       })


    },

  created(){
      this.$bus.$emit('active',true)
      
      setTimeout(()=>{
         this.istitle=true
      },100)
      setTimeout(()=>{
         this.isluopan=true
      },900)

  },

    //失活状态
    deactivated(){

      if(this.isluopan==true){
        this.istitle=false
        this.$bus.$emit('active',false)
      }
       
    },

    //激活状态
    activated(){
      if(this.isluopan==true){
         this.istitle=true
         this.$bus.$emit('active',true)
      }
    }

    
}
</script>


<style  scoped>  
@import '~assets/css/variable.css';
   .Search{
      height: 100%;
      color: rgba(240, 240, 240,1);
   } 
 
  .title{
      transition: all 1s;
      transform: translateY(0);
  }
  /* 用于标题的出入场动画 */
  .active{
     transform: translateY(-400%);
  }



  .singHover:hover{
      background: rgba(48,72,98,.5);
  }

  .rolling{
     width: 100%;
     height: calc(100% - 80rem);
     overflow-y: auto;
     border: none;
      opacity: 1;
     transition: all 2s;
  }
  .rollActive{
      opacity: 0;
  }

  .rolling::-webkit-scrollbar{
    width: 10rem;
    height: 1rem;
  }
  .rolling::-webkit-scrollbar-thumb{
    border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: white;
  }

  .rolling::-webkit-slider-runnable-track{
     border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: #ededed;

  }

  .perch{
    width: 100%;
    height: 40rem;
  }

  .page{
    width: 100%;
    height: 80rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .tem{
    position: fixed;
    left: 200rem;
    bottom: 100rem;
    right: 0;
    top: 0;
    margin: auto;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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