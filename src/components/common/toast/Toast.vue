<template>
  <div class="Toast" ref="move"
  :style="{width:width+'rem',height:height+'rem',bottom:bottom+'rem',right:right+'rem'}"
  >
    
    <div class='operate' :style="{height:child+'rem'}"></div>

    <div class='titleBox' 
    :style="{height:(arrLrc.length*child)+'rem',transform:'translateY('+top+'rem)'}">
      <span class='title' ref="mytitle" v-for='(item,index) in arrLrc'  :key="index" 
       :style="{
         height:child+'rem',lineHeight:child+'rem',
        
         transition:(index==lrcIndex)?'background-size '+interval+'s linear':''
         }" :class='{active:(index==lrcIndex)}'>
        {{item}}     
       </span>
        <!-- backgroundSize:(index==lrcIndex)?(stop+' 100%'):'0 100%', -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{
     toast:{
       type:Object,
       require:true
     },
     arrLrc:{
       type:Array,
       default(){
         return []
       }
     }
  },
  data () {
    return {
        width:this.toast.width||200,
        height:this.toast.height||300,
        bottom:this.toast.bottom||100,
        right:this.toast.right||0,
        child:this.toast.child||30,
        top:this.toast.child*2||60,
        lrcIndex:0,
        interval:2,

        // stopId:0,
        // stop:'100%',
        // isStop:true
    };
  },
  methods: {
       init({w,h,length,arr}){
         this.width=w,
         this.hight=h,
         this.child=h/length
         this.arr=arr

         console.log('我受到了歌词数据',w,h,length,arr)
       }
    },
  components: {

    },
    watch:{
      width(newv,old){
        console.log('宽度改变了',newv,old)
      }
    },

    mounted(){
       
      
      let el=this.$refs.move
      el.onmousedown=(e)=>{
          console.log('鼠标点击',e)
         let doc = document.documentElement
        let docw=doc.clientWidth -this.width-10
        let doch=doc.clientHeight-this.height-10

        let minRight=doc.clientWidth -this.width
        let minBottom=doc.clientHeight-this.height
        let x=e.pageX
        let y=e.pageY
         el.onmousemove=(e)=>{
           let right=this.right-(e.pageX-x)
           let bottom=this.bottom-(e.pageY-y)
            this.right=right<20?0:(right>docw?minRight:right)
            this.bottom=bottom<20?0:(bottom>doch?minBottom:bottom)
            x=e.pageX
            y=e.pageY

           console.log('鼠标移动',e)
         } 

         el.onmouseup=(e)=>{
           el.onmousemove=null
           el.onmouseleave=null
           console.log('鼠标抬起',e)
         }
          
          el.onmouseleave=(e)=>{
            el.onmousemove=null
            el.onmouseup=null
            console.log('鼠标离开',e)
          }
      }

       this.$bus.$on('stop',(res,index,flag)=>{
         console.log('结果',res)
        console.log('传入来的为真1111',document.querySelectorAll('.title')[this.lrcIndex-1].style.backgroundSize)
        console.log('传入来的为真222',document.querySelectorAll('.title')[this.lrcIndex].style.backgroundSize)
        console.log('传入来的为真333',document.querySelectorAll('.title')[this.lrcIndex+1].style.backgroundSize)  
        console.log('传入来的为真真真真真真',document.querySelectorAll('.title')[index].style.backgroundSize)      
          
          
          if(!flag){

          }else{

          }        

       })

      this.$bus.$on('lrcIndex',(index,interval)=>{
        this.lrcIndex=index
        this.interval=interval
        this.top=(-index*this.child)+this.toast.child*2
         
      })


    }
}
</script>

<style  scoped>
 .Toast{
   position: fixed;
   border-radius: 10rem;
   background:rgba(0,0,0,.6);
   overflow:hidden;
   box-shadow: 0 0 10rem 1rem rgba(240,240,240,.8);
   }
   .Toast:hover{
     cursor: pointer;
   }

   .operate{
     width:100%;
     position: absolute;
     left:0;
     top:0;
     opacity:0;
     background:rgba(0,0,0,.8);
     z-index:999
   }

   .operate:hover{
      opacity:1;
      border-top-left-radius:10rem;
      border-top-right-radius:10rem;
   }

   .titleBox{
    width:100%;
     display:flex;
     justify-content: center;
	   flex-wrap: wrap;
     text-align:center;
     flex-direction: column;
     align-items: center;
     position: absolute;
     transition: all 500ms linear;    
   }

   .title{
     overflow:hidden;
     text-align: center;
     font-size:16rem;
     background:white -webkit-linear-gradient(left, red,red) no-repeat 0 0;
      -webkit-text-fill-color:transparent;
      -webkit-background-clip:text;
      background-size:0 100%;
   }


.active{
  font-size:20rem;
  background-size:100% 100%;
  /* transition:background-size 2s linear; */
}
</style>