<template>
  <div class="LuoPan" :style="{width:width+'px',height:height+'px'}">

      <!-- 秒钟 -->
      <div class="seconds" :style="{transform:'rotate('+degs+'deg)', transition:'all '+number+'s'}" :class="{actives:isActive}">
          <div class="se" v-for="(item,index) in second" :key="index"

          :style="{transform:'rotate(calc('+index+' * 6deg))  translateX(262%)'}"
          
          >{{item}}</div>
      </div>

       <!-- 分钟-->
       <div class="minutes" :style="{transform:'rotate('+degm+'deg)', transition:'all '+number+'s'}" :class="{activem:isActive}">
           <div class="mi" v-for="(item,index) in minute" :key="index" 
          
           :style="{transform:'rotate(calc('+index+' * 6deg))  translateX(262%)'}"
           
           >{{item}}</div>
       </div>
       
       <!-- 时钟 -->
       <div class="hours" :style="{transform:'rotate('+degh+'deg)', transition:'all '+number+'s'}" :class="{activeh:isActive}">
           <div class='ho' v-for="(item,index) in hour" :key="index"

           :style="{transform:'rotate(calc('+index+' * 15deg))  translateX(262%)'}"
           
           >{{item}}</div>

       </div>

       <div class="round" :style="{background:back}"></div>
       <div class="text" >{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'LuoPan',
  data () {
    return {
        title:'一九九七年八月十九日',
        time:['一','二','三','四','五','六','七','八','九','十'],
        second:[],
        minute:[],
        hour:[],
        s:0,//秒针的次数
        m:0,//分针的次数
        h:0,//时针的次数
        degs:0,
        degm:0,
        degh:0,
        toggleTime:null,//页面(浏览器小化)显隐,清除/重启定时器
        isActive:false,//开关动画
        number:1

    };
  },
  props:{
     width:{
         type:Number,
         default:1000,
     },
     height:{
         type:Number,
         default:1000
     },
     back:{
         type:String,
         default:'yellow'
     }
  },
  methods: {

      //创建时间
        getTime(timer=60,name){
            let left=''
            let right=''
            let arr=[]

            for(let i=0;i<timer;i++){
                let number=i%10
                let leftNumber=Math.floor(i/10)-1

                if(i>=10){
                    if(i%10==9){
                       leftNumber++
                       right=''
                    }else{
                       right=this.time[number]
                    }

                   left=i<19?'十':this.time[leftNumber]+'十'
                    
                }else{
                    right=this.time[number] 
                }
                
                let string=left+right+name

                string=string=='六十分'?'零分':string
                arr.unshift(string)
            }

            return arr
        },

        //计算当前日期
        getDate(time=new Date()){
           let year=['零','一','二','三','四','五','六','七','八','九','十','十一','十二']
           let date=['十','一','二','三','四','五','六','七','八','九','']
           let str='十'
           let arr=time.getFullYear().toString().split('')
            let slice=time.getDate().toString().split('')
            if(slice[slice.length-1]==0||slice.length==1)str=''
            slice.push(10)
            this.title=year[arr[0]]+year[arr[1]]+year[arr[2]]+year[arr[3]]+'年'
                    +year[time.getMonth()+1]+'月'+date[slice[0]]+str+date[slice[1]]+'日'

        },

        //计算
        getDay(){
            let time=new Date()
            this.getDate(time)
            let s=time.getSeconds()
            let m=time.getMinutes()
            let h=time.getHours()
            this.s=s
            this.m=m
            this.h=h

            this.degh=-(24-h)*15-2 //抬1deg避免紧挨
            this.degm=-(60-m)*6       
            this.degs=-(60-s)*6
        },


       
    },
  components: {

    },
    computed:{
        obj2(){
            return {
                width:this.width+'px',
                height:this.height+'px'
            }
        }
    },
    watch:{
        s(){
            if(this.s%60==0){
                this.m++
                this.degm=this.degm+6
            }
        },
        m(){

            if(this.m%60==0){
                this.h++
                this.degh=this.degh+15
            }
            
        },
        h(){
            if(this.h%24==0){
               this.getDate()
            }
        }
    },

    created(){

        this.second=this.getTime(60,'秒')
        this.minute=this.getTime(60,'分')
        this.hour=this.getTime(24,'时')
        
        //入场动画
        this.isActive=true
        this.degm=360
        setTimeout(()=>{
            this.degm=0
            this.isActive=false
            this.getDay()
        },100)
        
       


    },
    mounted(){  
        this.toggleTime=setInterval(()=>{
           this.s++
           this.degs=this.degs+6
        },1000)


        //发送该实列,主要用于销毁实列
        this.$emit('sendDestroy',this)


         //浏览器最小化
        document.onvisibilitychange=()=>{   
            if(document.visibilityState=='visible'||document.visibilityState=='prerender'){       
             this.number=0
              this.isActive=true
                setTimeout(()=>{
                    this.number=1
                    this.isActive=false
                    
                },100)
            }
        }


    },
}
</script>

<style  scoped>
 .LuoPan{
  position: relative;
  z-index: -1;
}


.minutes,.hours,.seconds{
    opacity: 1;
    border-radius: 50%;
    position: absolute;
}
.seconds{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
}
.minutes{
    width: 75%;
    height: 75%;
    left: 12.5%;
    top:12.5%;
    
    transform: rotate(0deg);
}
.hours{
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
     overflow: hidden;
    
}
.minutes .mi,.hours .ho,.seconds .se{
    width: 16%;
    height: 6%;
    position: absolute;
    text-align: right;
   font-size: 13px;
    top:47%;
    left:42%;
}


 .LuoPan .round{
   position: absolute;
   width: 1%;
   height: 1%;
   border-radius: 50%;
   left:49.5%;
   top:50.5%;
   z-index: 1;
}

 .LuoPan .text{
     position: absolute;
     width: 50%;
     height: 4%;
     min-height: 16px;
     display: flex;
     align-items: flex-end;
     justify-content: center;
     left:25%;
     top: 47%; 
     text-align: center;
     font-size: 16px;
 }
  .LuoPan .text::after{
      content: '';
      display: block;
      width: 112%;
      height: 1px;
      position: absolute;
      left: 50%;
      background: white;
  }


  .actives{
     width: 0%;
     height: 0%;
     left: 50%;
     top: 50%;
     opacity: 0;
  }

  .activem{
    opacity: 0;
  }
  .activeh{
     width: 200%;
     height: 200%;
     left: -50%;
     top: -50%;
     opacity: 0;
  }



</style>