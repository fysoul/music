<template>
  <div class="Down">

    <div class="title">
       <Title :text="text" :number='0' @getNumber='getnumber'></Title>
    </div>
   

     <div class="music">

      <div class="showbox">
         <ShowMusicBox :singObj='title' :flex='flex' singh='40rem' :keys='keys'>
            {{title.operation}}        
         </ShowMusicBox>
      </div>
      
      <div class="sing  roll" >
              <ShowMusicBox class="singHover" v-for="(item,index) in allArr[number]" :border='true' 
              :key="index" :singObj='item' :flex='flex' singh='40rem' :index='index+1'
               :keys='keys'    @dblclick.native="sendObj(item,index,allArr[number])">
               
                <span class='iconfont icon-sc3 size' @click="remove(index)"></span>  
              </ShowMusicBox>
      </div>
    </div>

    
  </div>
</template>

<script>
import ShowMusicBox from 'components/content/search/ShowMusicBox'
import Title from 'components/content/down/Title'
export default {
  name: 'Down',
  data () {
    return {
        loading:[],//正在下载1
        pasue:[],//暂停2
        success:[],//完成3
        allArr:[],//总数组
        keys:['name','pro','state','quality'],
        title:{name:'歌曲',pro:'进度',state:'状态',quality:'品质',operation:'操作'},
        text:['全部任务','正在下载','已暂停','下载完成'],
        number:0
    };
  },
  methods: {
        getnumber(res){
          this.number=res
        },

         sendObj(obj,index,arr){//发送一个对象或当前数组用于播放 
          this.$bus.$emit('changeIndex',obj,index,arr)
       },


        //移除歌曲方法
        remove(index){
             this.allArr[this.number].splice(index,1)
            let string=JSON.stringify(this.allArr[this.number])
            localStorage.setItem('down',string)
        }
    },
  components: {
       Title,
      ShowMusicBox 
    },

    created() {
      this.locaArr.forEach(item=>{
          item.pro='100%'
          item.state='下载完成'
          item.quality='128k'
        })
        //汇总到一个数组
        this.allArr.length=4
        this.allArr[0]=this.locaArr
        this.allArr[3]=this.locaArr
    },
}
</script>

<style  scoped>
 .Down{
    width: 100%;
    height: 100%;
    position: relative;
}

.title{
  width: 100%;
  height: 60rem;
  padding: 10rem 0rem;
}

.music{
  width: 100%;
  height: calc(100% - 80rem);
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

  .singHover:hover{
    background:rgba(48,72,98,.5);
  }

  .size{
    display: block;
    text-align: center;
    line-height: 40rem;
    width: 40rem;
    height: 100%;
    font-size: 16rem;
  }
  .size:hover{
    background: rgba(48,72,98,.1);
  }
</style>