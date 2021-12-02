<template>
  <div class="Like">
    <div class='title' :style="{height:height+'rem',lineHeight:height+'rem'}">
        {{title}}
        <span v-if="contr"  class="icon-addlist1 iconfont" @click="state"></span>
        
    </div>

    <div v-if="contr" class="change" :style="{top:top,left:left,display:show}">
            <span @click="rest">重命名</span>
            <span @click="up">上移</span>
            <span @click="down">下移</span>
            <span @click="del">删除</span>
    </div>

    <div class="over" ref="overbox" :style="{height:'calc(100% - '+height+'rem)'}" >

       <div  v-for="(item,index) in listName" :key="index" @click="send(index)" 
       :style="{height:height+'rem',lineHeight:height+'rem',
       background:nowIndex==index?(isclick==index?'rgba(48,72,98,.5)':'rgba(48,72,98,.2)'):
       (isclick==index?'linear-gradient(90deg,rgba(48,72,98,.5),white,rgba(48,72,98,.5))':'transparent')
        }" 
        @contextmenu.prevent="menu(index,$event)">
          <input class="list" :value="item" :disabled='!isrest||(nowIndex!=index)' ref="li"
          @blur="updateName" @keydown.enter="updateName"
        >
       </div>
        

        <input class="addname" :style="{transform:isflag?'translateX(0)':'translateX(-100%)'}"
        type="text" placeholder="新列表..." v-model="msg" @keydown.enter="add" @blur="add">

    </div>
    
    

  </div>
</template>

<script>
export default {
  name: 'LikeList',
  props:{
      listName:{
          type:Array,
          default(){
              return []
          }
      }, 

      contr:{
          type:Boolean,
          default:true
      },

      

      width:{
          type:Number,
          default:100
      },
      boxhight:{
         type:String,
         default:'100%'
      },
      height:{
          type:Number,
          default:40
      },
      title:{
          type:String,
          default:'我的列表'
      }
  },
  data () {
    return {
        isflag:false,
        msg:'',
        top:0,
        left:0,
        show:'none',
        nowIndex:-1,
        isrest:false,
        isclick:0,//点击x个
        
        // dataArr:this.listName
    };
  },
  methods: {

      rest(){
         this.isrest=true
         
         if(this.nowIndex==-1)return
        let el=this.$refs.li[this.nowIndex]
        el.focus()
        this.show='none'
      },
      //改变名字
      updateName(){
        let name=this.$refs.li[this.nowIndex].value.trim()
        this.$emit('change',name,this.nowIndex)

        this.isrest=true
        this.nowIndex=-1
        this.show='none'

      },

      up(){
          if(this.nowIndex<=2)return this.$message.error('前二项不可移动')
         
          this.$emit('change',{type:'up'},this.nowIndex) 
          this.isrest=true
          this.nowIndex=-1
          this.show='none'
      },

      down(){
           if(this.nowIndex>=this.listName.length-1)return this.$message.error('已是最后一项')

          this.$emit('change',{type:'down'},this.nowIndex) 
          this.isrest=true
          this.nowIndex=-1
          this.show='none'
      },

      del(){
          if(this.nowIndex<=1)return this.$message.error('不允许删除默认')
          this.$emit('change',true,this.nowIndex) 
          this.isrest=true
          this.nowIndex=-1
          this.show='none'
      },




        send(index){
            this.isclick=index
           this.$emit('sendIndex',index)
        },

        state(){
            this.isflag=!this.isflag
        },

        add(){
            this.isflag=false
            if(!this.msg.trim())return
            let obj={}
            obj.name=this.msg
            obj.id=this.listName.length
            obj.music=[]
            this.$emit('getSing',obj)
            
             this.msg=''
        },

        menu(index,e){
            this.isflag=false
            let h=parseFloat(window.getComputedStyle(this.$refs.overbox).height).toFixed(2)
            let y=e.offsetY+this.height*(index+1)
            this.top=(h-y>120?y:h-120)+'rem'
            this.left=e.offsetX+'rem'
            this.show='block'
            this.nowIndex=index
        }
    },
  components: {

    },

    mounted(){
       document.body.onclick=()=>{
           this.show='none'
       }
    }
}
</script>

<style  scoped>
 .Like{
   width: 100%;
   height: 100%;
    position: relative;
}

.title{
    text-indent: 20rem;
    border-bottom:1rem solid rgba(48,72,98,1);
    position: relative;
}


.title span{
    position: absolute;
    opacity: 0;
    right: 10rem;
    top: 0;
}

.title:hover span{
    transition: all 200ms;
    cursor: pointer;
    opacity: 1;
}


.over{
    width: 100%;
    overflow:auto;
   
}

.over::-webkit-scrollbar{
    width: 5rem;
    height: 1rem;
  }
  .over::-webkit-scrollbar-thumb{
    border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: rgba(48,72,98,.5);
  }

  .over::-webkit-slider-runnable-track{
     border-radius: 10rem;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .2);
    background: #ededed;
    
  }

.list{
    width: 100%;
    height: 100%;
    text-indent: 20rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    background: transparent;
}

.list:hover{
    background: rgba(48,72,98,.5);
    cursor: pointer;
}

.addname{
  width: 100%;
  padding: 0 20rem;
  height: 40rem;
  border: none;
  outline: none;
  background: rgba(0,0,0,.5);
  color: white;
  transition: all 1s;
}

.active{
    transform: translateX(0rem);
}

.change{
    width: 50%;
    height: 160rem;
   position: absolute;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   align-items: center;
   background: white;
   border-radius: 5rem;
   box-shadow: 0 0 5rem 5rem rgba(48,72,98,.5);
   color: black;
}
.change span{
    display: flex;
    justify-content: center;
   flex-wrap: wrap;
   align-items: center;
   width: 100%;
   height: calc(100% / 4);
}

.change span:hover{
    background: rgba(48,72,98,.5);
    cursor: pointer;
}
</style>