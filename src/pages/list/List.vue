<template>
  <div class="box">
    
    <!-- <router-view></router-view> -->
    
    <div class="title">
        <Title :text="text" :number='1' @getNumber='typeNumber' :slotNumber='0'>
          
            <div class="slot" @click="showTag">
                {{tagName}}   
                <span class="icon-fx iconfont fx" :style="{transform:isshow?'rotate(90deg)':'rotate(-90deg)'}"></span>
            </div>
            <div class="tagbox" 
              :style="{height:isshow?'300rem':'0rem',
              borderRight:isborder?'2rem solid white':'none',
              borderBottom:isborder?'2rem solid white':'none'}">

              <Tag :tag='tag1' @sendTagMsg='getTagMsg'/>
              <Tag :tag='tag2' @sendTagMsg='getTagMsg'/>
              <Tag :tag='tag3' @sendTagMsg='getTagMsg'/>
            </div>
        </Title>
    </div>
    <div class="musicbox clear">
          <Card class="card" v-for="(item,index) in nowObj.music[number-1]" :key="index" :msg='item'  @getMsg="showlist"/>
         
           <!-- music.length!=0&&istotal&&music.length -->
          <template v-if="nowObj.total>30&&!loading">
                <div class="page">
                  <!-- show-less-items  -->
                    <a-pagination v-model="number" :pageSize='30' :total="nowObj.total" @change='change'/>
                </div>
                  
          </template> 

    </div>
  </div>
</template>

<script>
import Card from 'components/content/card/Card'
import Title from 'components/content/down/Title'
import Tag  from    'components/content/listchild/Tag'

import {recommended,catlist,hot,net} from 'network/list.js'

export default {
  name: 'List',
  data() {
    return {
      text:[
        '默认',
        '推荐',
        '最热'
      ],
       
      tagName:'默认',
      tag1:{
        title:'热门标签',
        arr:['古风','华语','流行','摇滚','电子','轻音乐'],
        msg:['gf','hy','lx','yg','dz','qyy']
      },

      tag2:{
        title:'语种',
        arr:['日语','韩语','粤语','华语'],
        msg:['ry','hany','yy','hy']
      },

      tag3:{
        title:'主题',
        arr:['二次元','伤感','安静','治愈','游戏','00后','经典','影视','孤独'],
        msg:['ecy','sg','aj','zy','yx','00h','jd','ysys','gd']
      },

       netData:{
         limit:30,
         order:'hot',
         offset:0,
         cat:''
       },
       nowObj:{
         music:[],
         total:0,
         title:''
       },

       musiclist:{},//缓存数组
       nowtitle:'tj',//当前类型
       number:1,//当前页面
       loading:false,//是否处于加载状态

       isshow:false,//是否显示标签
       isborder:false

    }
  },
  components:{
    Card,
    Title,
    Tag
  },
  methods:{

    //获取标签信息
    async getTagMsg(index,value,msg){
        
        this.netData.cat=value
        this.tagName=value
        this.nowtitle=msg
        this.change(1)
       this.showTag()
    },

    //展示标签
    showTag(){
       this.isshow=!this.isshow
       if(!this.isborder){
         this.isborder=!this.isborder
       }else{
          setTimeout(()=>{
            this.isborder=!this.isborder
          },300)
       }
       
    },

    showlist(res){
       this.$router.push({
         name:'listchild',
         params:{
           res
         }
       })
    },

      //改变页面
     async change(x){
       this.number=x//设置当前页码
        this.netData.offset=(x-1)*this.netData.limit//设置当前偏移量
        if(this.nowtitle=='zr')this.netData.cat=''//判断何种类型

        let obj=this.musiclist[this.nowtitle]
        if(obj){//判断原来是否有过的该页的数组
            if(obj.music[x-1]&&obj.music[x-1].length>0){
              this.nowObj=obj
              return
            }

            this.loading=true
            let time=this.$message.loading('正在搜索数据',0)
            let data;
            try {
              data=await net(this.netData)
            } catch (error) {
               setTimeout(time,0)
            }
            obj.music.length=obj.music.length>x?obj.music.length-1:x-1
            obj.music.splice(x-1,1,data.music)
            this.nowObj=obj
            setTimeout(time,0)
            this.loading=false
          //  this.$message.loading('数据搜索成功',1)
        }else{

          this.loading=true
          let time=this.$message.loading('正在搜索数据',0)

          let msg;
            try {
              msg=await net(this.netData)
            } catch (error) {
               setTimeout(time,0)
            }
          let arr=[]
          arr.push(msg.music)
          msg.music=arr
          this.nowObj=msg
          this.musiclist[this.nowtitle]=msg

          this.loading=false
          setTimeout(time,0)
        }

       
    },


   async typeNumber(res){
     this.number=1
      if(res==1){ 
          this.tagName='默认'
          this.nowtitle='tj'
          if(this.musiclist.tj){
            this.nowObj=this.musiclist.tj
            return
          }   
          let time=this.$message.loading('正在搜索数据',0)


          // let data;//请求获取
          //   try {
          //     data=await recommended()
          //   } catch (error) {
          //      setTimeout(time,0)
          //   }
          
        
        //从store中获取
        let data=this.$store.state.listSings

        //对数据的再加工
       let arr=[]
       arr.push(data.music)
       data.music=arr

        this.nowObj=data
        this.musiclist[this.nowtitle]=data

      setTimeout(time,0)

      }else if(res>1){
          this.tagName='默认'
          this.nowtitle='zr'
        if(this.musiclist.zr){
            this.nowObj=this.musiclist.zr
            return
        }
        let time=this.$message.loading('正在搜索数据',0)
        this.netData.cat=''

        let data;
            try {
              data=await net(this.netData)
            } catch (error) {
               setTimeout(time,0)
            }


        //对数据的再加工
       let arr=[]
       arr.push(data.music)
       data.music=arr
       this.nowObj=data
       this.musiclist[this.nowtitle]=data
       
        setTimeout(time,0)
      }

    },



  },

} 
</script>

<style scoped>
    .box{
      width: 100%;
      height: 100%;
    }

    .test{
      margin: 20rem;

    }

    .page{
    width: 100%;
    height: 80rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .musicbox{
    width: 100%;
    height: calc(100% - 80rem);
    overflow-y: auto;
  }

  .musicbox::-webkit-scrollbar{
    width: 10rem;
    height: 1rem;
  }
  .musicbox::-webkit-scrollbar-thumb{
    border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: white;
  }

  .musicbox::-webkit-slider-runnable-track{
     border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: #ededed;

  }

  .card{
    float: left;
      margin: 15rem;
  }

  .title{
  width: 100%;
  height: 60rem;
  padding: 10rem 0rem;
}

.slot{
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 2rem solid white;
  font-size: 17rem;
}

.fx{
   position: absolute;
   right: 5rem;
   top: 0rem;
   font-size: 16rem;
  transition: all 500ms;
}

.tagbox{
  width:600rem;
  height: 300rem;
  position: absolute;
  top: calc(100%);
  left: 0rem;
  border-bottom-right-radius: 10rem;
  /* border-right: 2rem solid rgba(117, 152, 189, 1);
  border-bottom:2rem solid rgba(117, 152, 189, 1); */
  /* background: #ededed;white; */
  background:rgba(0, 0, 0, .9); 
  z-index: 10;
  transition: height 300ms;
   overflow-y: auto;
  padding: 0rem 20rem;


  color: black;
}

 .tagbox::-webkit-scrollbar{
    width: 8rem;
    height: 1rem;
  }

  /* rgba(48,72,98,.3); rgba(236,65,65);*/
  .tagbox::-webkit-scrollbar-thumb{
    border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: rgba(48,72,98,1);
  }

  .tagbox::-webkit-slider-runnable-track{
     border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: #ededed;
  }
</style>


