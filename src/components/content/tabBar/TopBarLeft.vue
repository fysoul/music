<template>
  <div class="TopBarLeft" @click="eventAgent"   ref="box" :style="newHight">
     <input class="in" type="text" @keydown="keys"
     v-model="parameter.name" ref="text" :placeholder="content" 
     @focus.stop="deletHolder" @input="search" @blur="deletevalue"/>

     <i class="icon-search iconfont icon" @click.stop="searchMusic(-1)"></i>
     <div class="fuzzy" v-for="(item,index) in fuzzy.songs" :class='{active:index==isIndex}' :key="index"
     @mouseenter="getIndex(index)" >
        {{item.name}}
     </div>
     
  </div>
</template>

<script>
import {search,detailed,msg} from 'network/search'
import {getTime} from 'common/public'

export default {
  name: 'TopBarLeft',
  data () {
    return {
       content:'search for something...',
       songs:[],
       boxw:40,
       timer:null,
       timeMsg:null,//延迟信息
       loading:true,//判断搜索数据是否完成
       fuzzy:{songs:[],albums:[]},
       isSearch:true,//还处于搜索状态(没有按下搜索按钮)
       parameter:{name:'',limit:30,offset:0},
       isfuzzy:false,//判断该类的标签请求数据成功没
       isIndex:-1,//判断是否选中下拉框的x数据
    };
  },
  methods: {

      deletHolder(){
       this.$refs.box.style.height=(this.fuzzy.songs.length+this.fuzzy.albums.length+1)*this.boxw+'rem'
      },

      deletevalue(){//失去焦点事件会比点击事件的eventAgent先执行
            this.$refs.box.style.height='40rem'
      },
      
      eventAgent(e){
            if(e.target.className=='fuzzy active'){
               let name=e.target.innerText
               if(name)this.parameter.name=name
               this.searchMusic(-1)   
            }

      },


      //搜索详情音乐
      searchMusic(index){
          this.$bus.$emit('loading',false)//开始搜索
          if(index==-1){
              index=0
          }

          this.parameter.offset=this.parameter.limit*index
          this.getMusic(index+1)
          if(this.$route.path=='/search'){
              return
          }
          this.$router.push('search')
          
      },


      getSearch(data){
          let arr=[]
                data.forEach((el) => {
                    let obj={}
                    obj.name=el.name//歌名
                    obj.artists=''//艺术家
                    obj.id=el.id,//歌名的id
                    obj.fee=el.fee//收付费
                    obj.mvid=el.mvid//mv
                    obj.album=el.album.name//专辑
                    obj.duration=el.duration//时间
                    obj.textime=getTime(el.duration) //文本时间
                    obj.img=''
                    obj.lrc=''
                    
                    el.artists.forEach((element,number) => {
                        let fu='/'
                        if(el.artists.length-1==number){
                             fu=''
                        }
                        obj.artists+=element.name+fu
                    });
                   
                   
                   arr.push(obj)
            })

            return arr
      },

      //具体请求音乐方法
      getMusic(index){
          this.loading=false
          detailed(this.parameter).then(res=>{
            //   this.fuzzy={songs:[],albums:[]}
              this.$refs.box.style.height='40rem'
              let data=res.songs
              this.$bus.$emit('getCount',res.songCount,index)
              res=this.getSearch(data)
              return res
          }).then(res=>{

             let idArray=res.map(item=>{
                 return item.id
             })
              let ids=idArray.join(',')
            msg(ids).then(result=>{
              res.forEach((el,index) => {
                  el.img=result[index].al.picUrl
              });
              this.loading=true
              this.$store.dispatch('search/getSearch',res)
              this.$bus.$emit('loading',true)
            })

          }).catch(err=>{
              this.loading=true
            //   this.fuzzy={songs:[],albums:[]}
              this.$refs.box.style.height='40rem'
              this.$bus.$emit('loading',true)
          })



      },

      //键盘按下事件
      keys(e){
         let key=e.keyCode
         let el=document.querySelectorAll('.fuzzy')
         if(key==13){
             document.querySelector('.in').blur()
             this.searchMusic(-1)
         }else if(key==40){
            this.isIndex++  
             if(this.isIndex>=this.fuzzy.songs.length)this.isIndex=0   
            this.parameter.name=el[this.isIndex].innerText
         }else if(key==38){
             
             this.isIndex--
             
             if(this.isIndex<=-1){
                this.parameter.name=this.$refs.text.innerText
                this.isIndex=-1
                return 
            }   
            this.parameter.name=el[this.isIndex].innerText
             
         }
      },

      getIndex(index){
          this.isIndex=index
      },


      search(){
          
        this.isIndex=-1
        let name=this.$refs.text.value.trim()
        if(!this.loading||!name){
            //慢速操作
            if(!name){
                this.$refs.box.style.height='40rem'
            }
            // this.fuzzy={songs:[],albums:[]}
            return
        }
        if(this.timer)clearTimeout(this.timer)
        if(this.timeMsg)clearTimeout(this.timeMsg)
        this.timer=setTimeout(()=>{
                search(name).then(res=>{
                    //因为是异步方法需要重新获取value值(快速操作)
                     if(!this.$refs.text.value.trim()){
                        this.fuzzy={songs:[],albums:[]}
                        this.$refs.box.style.height='40rem'
                        return
                    }
                    if(!res.songs){
                        this.loading=true
                        
                        this.timeMsg=setTimeout(()=>{
                           this.$message.warning('无相关歌曲',1)
                        },500)
                        
                        return
                    }
                    res.songs.forEach((el,index) => {
                        let obj={}
                        obj.name=el.name
                        obj.author=''
                        el.artists.forEach((element,number) => {
                             let fu='/'
                             if(el.artists.length-1==number){
                                  fu=''
                             }
                             obj.author+=element.name+fu
                        });
                        this.fuzzy.songs.length!=0?this.fuzzy.songs.splice(index,1,obj):this.fuzzy.songs.push(obj)
                        
                    });
                    
                    //有时候会没有专辑,填充一个长度为2的数组
                    this.fuzzy.albums=res.albums||new Array(2)
                    this.loading=true
                }).catch(err=>{
                    this.loading=true

                    this.timeMsg=setTimeout(()=>{
                        this.$message.warning('获取失败',1)
                    },500)
                    
                })
            },300)
      },
    

  },
  computed:{
      newHight(){

          let h=(this.fuzzy.songs.length+this.fuzzy.albums.length+1)*this.boxw+'rem'
           return {height:h}
           
      },
     
  },
  mounted() {
       this.$bus.$on('pageIndex',(res)=>{
           this.searchMusic(res-1)
       })
        
  },
}
</script>

<style  scoped>
    .TopBarLeft{
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius:5rem;
        color: black;
        background: rgba(200,200,200,1);
        z-index: 777;
        transition: all 200ms linear;
    }
    
    i{
        width: 60rem;
        height: 40rem;
        position: absolute;
        right:0rem;
        top:0rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    i:hover{
        background: rgba(255,255,255,1);
       color: rgba(48,72,98,1);
    }

    input{
        width:calc(100% - 50rem);
        height: 40rem;
        outline: none;
        position: absolute;
        border:none ;
        border-radius: 5rem;
        padding: 0 40rem 0 10rem;
        overflow: hidden;
        background: transparent;
    }

    .fuzzy{
        width: 100%;
        height: 40rem;
        line-height: 40rem;
        padding: 0 40rem 0 10rem;
        overflow: hidden;
    }

    .TopBarLeft .fuzzy:nth-child(3){
        margin-top: 50rem;
    }

    .active{
       background: rgba(255,255,255,1);
       color: rgba(48,72,98,1);
    }
</style>