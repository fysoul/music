<template>
  <div class="PlayLine" :style="lineBox" ref="lineBox" 
  :title="linekey=='mute'?('当前音量'+this.per+'%'):''">
     <div class="line" :style="line"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayLine',
  props:{
      lineWidth:{
         type:String,
         default:'100%'
      },
      insideColor:{
          type:String,
          default:'white'
      },
      outsideColor:{
          type:String,
          default:'red'
      },
      rightCap:{
          type:String,
          default:'circle'
      }, 
      LineCap:{
          type:String,
          default:'circle'
      },
      percent:{
          type:Number,
          default:50
      },
      showInfo:{
          type:Boolean,
          default:false
      },
      disable:{
          type:Boolean,
          default:false
      },
      fuzzy:{
          type:Number,
          default:1
      },
      linekey:{
          type:String,
          require:true
      }
  },
  data () {
    return {
        per:this.percent,
        radius:0,
        boxWidth:0,
        opacity:this.fuzzy,
    };
  },

  methods: {

      changeWidth(e){
                let x=e.offsetX<this.radius?0:(e.offsetX>(this.boxWidth-this.radius)?this.boxWidth:e.offsetX)
                this.per=((x/this.boxWidth).toFixed(2))*100
                
                
        },

       change(){
           let element=this.$refs.lineBox
            element.onmousemove=(e)=>{
                  this.changeWidth(e)
            }
            element.onmouseup=(e)=>{
                element.onmousemove=null
                 element.onmouseleave=null
                 
                 this.changeWidth(e)
                 this.$bus.$emit('progress',this.per,this.linekey)
                 
              }

            element.onmouseleave=(e)=>{
                element.onmousemove=null
                element.onmouseleave=null
                this.changeWidth(e)
            }
       },

       calculate(){
            let h=parseFloat(window.getComputedStyle(this.$refs.lineBox).height).toFixed(2)
            this.boxWidth=parseFloat(window.getComputedStyle(this.$refs.lineBox).width).toFixed(2)
            this.LineCap=='circle'?this.radius=h/2:this.radius=0
        }
    },
  components: {

    },

    computed:{
        lineBox(){
           
            return {
                background:this.insideColor,height:this.lineWidth,
                borderRadius:this.radius+'rem'}
        },

        line(){
            let obj={
                background:this.outsideColor,width:(this.per+'%'),
                opacity:this.opacity
            }
            if(this.rightCap!='circle'){
                obj.borderTopLeftRadius=this.radius+'rem'
                obj.borderBottomLeftRadius=this.radius+'rem'
            }else{
                obj.borderRadius=this.radius+'rem'
            }
            return obj
        }
    },

    mounted(){

        //解绑事件
        // function removeEventListener(element,type,fnName) {
        //     if(element.removeEventListener){
        //     element.removeEventListener(type,fnName,false);
        //     }else if(element.detachEvent){
        //     element.detachEvent("on"+type,fnName);
        //     }else{
        //     element["on"+type]=null;
        //     }
        // }
        if(this.fuzzy!=1){
            this.$refs.lineBox.onmouseenter=()=>{
               this.opacity=1
           
        }

         this.$refs.lineBox.onmouseout=()=>{
               this.opacity=this.fuzzy
            }
        }
       

        
        this.calculate()
        // 等前面样式计算完在获取宽高
        this.$nextTick(()=>{
            this.calculate()
        })

        window.onresize=()=>{
            this.calculate()
        }
        this.$refs.lineBox.onmousedown=()=>{
            this.change()
        }
        if(this.disable)this.$refs.lineBox.onmousedown=null


        this.$bus.$on('change',(res,key)=>{
            if(key==this.linekey){
                
                this.per=Math.ceil(res)
            }
        })
      
       
    
    }
}
</script>

<style  scoped>
 .PlayLine{
    width: 100%;
   overflow:hidden;

}

.line{
    height: 100%;
    transition: width 300ms linear;
}
</style>