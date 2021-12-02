<template>
  <div class="ListChild">
    <div class="titlebox">
       <ListDes :obj='obj' @sendIndex='getIndex'></ListDes>
    </div>
     

    <div class="music">

      <div class="showbox">
         <ShowMusicBox :singObj='title'  singh='40rem'  :keys='keys'>
           {{title.operation}}
            
         </ShowMusicBox>
      </div>

      <div class="sing  roll"   >
              <ShowMusicBox class="singHover" v-for="(item,index) in music" 
              :key="index" :singObj='item'  singh='40rem' 
              :index='index+1' :keys='keys' :border='true' @dblclick.native="sendObj(item,index)">
                <span class='iconfont icon-xz3 size' @click="sendadd(item)"></span>  
                <span class='iconfont icon-xz size' @click="download(item)"></span>
              </ShowMusicBox>
      </div>
    </div>


  </div>
</template>

<script>
import ListDes from 'components/content/listchild/ListDes'
import ShowMusicBox from 'components/content/search/ShowMusicBox'
import {getIds} from 'network/list.js'
import {msg} from 'network/search.js'
import {getTime} from 'common/public'

export default {
  name: 'ListChild',
  data () {
    return {
       music:[],
       keys:['name','artists','album','textime'],
       title:{name:'歌曲',artists:'歌手',album:'专辑',textime:'时长',operation:'操作'},
       obj:{},
    };
  },
  methods:{

       //发送收藏的方法
     sendadd(data){
           this.$bus.$emit('addLike',true,data)
        },

     sendObj(obj,index){//发送一个对象  
          this.$bus.$emit('changeIndex',obj,index)
      },

      //获取点击类型
       getIndex(res){
         if(res==1){
           this.$bus.$emit('changeIndex',this.music[0] ,0)
         }else if(res==2){
            this.$router.go(-1)
         }else{

           let time=this.$message.loading('添加到列表',0)//这里没有异步方法
           let obj={}
           obj.name=this.obj.title
           obj.id=this.music.length-1
           obj.music=this.music

           let loca=localStorage.getItem('dataArr')
           let dataArr=JSON.parse(loca)
           dataArr.push(obj)
           this.$bus.$emit('updatelike',dataArr)

           let string=JSON.stringify(dataArr)
            localStorage.setItem('dataArr',string);
           
           setTimeout(time,0)
           this.$message.success('that is ok',1)
         } 
      },
  },
  components: {
    ShowMusicBox,
       ListDes,
    },

  async created() {
     this.obj=this.$route.params.res

     let arr=this.$store.state.list.listArr
     let index=arr.findIndex (item=>{
        return item.id==this.obj.id
     })
    if(index!=-1){
       this.music=arr[index].music
       return
    }
      let number=1
      let time=this.$message.loading('初次渲染时长 '+number,0)
      let clear=setInterval(()=>{
        
        number++
        time=this.$message.loading('初次渲染时长 '+number,0)
      },1000)    
      let data=await getIds(this.obj.id)
      let ids=await msg(data.join(','))
          
          ids.forEach(el => {
                 

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
                this.music.push(obj)
          });

        this.$store.dispatch('list/getlistMusic',{music:this.music,id:this.obj.id})

        setTimeout(time,0)
        clearInterval(clear)
  },

}
</script>

<style  scoped>
 .ListChild{
   width: 100%;
   
   height: 100%;
}

.titlebox{
  width: 100%;
   height:100rem;
  padding: 10rem;
  box-sizing: border-box;
}





 .music{
      width: 100%;
       height:calc(100% - 100rem);
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
     overflow-y: auto;
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