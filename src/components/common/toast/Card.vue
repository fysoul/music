<template>

    <div class="Card" :style="obj" ref="card">
        <div class="title">
           <span @click="close(false)">x</span>
        </div>
        <div class="content">添加 {{title}} 到...</div>
        <div class="body">
            <div v-for="(item,index) in dataArr" ref="list" :key="index" 
              class="write" @click="add(item,index)">{{item.name}}</div> 
            <div class="addbox">
                <input class="add" v-model='msg' 
                @focus="back" @keydown.enter="lazy" @blur="lazy"/>
                <span class="icon-add iconfont"></span>
                
            </div>

        </div>

    </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
         obj:{},
        height:this.h,
        msg:'',
        dataArr:[],
        title:'',
        isadd:[],//已有歌曲的数组
          
        origin:['center','bottom left','bottom right','top left','top right'],

        late:['translate(0rem,-200rem)','translate(0rem,200rem)',
        'translate(500rem,0rem)','translate(-500rem,0rem)','scale(0.3)'],

        outAnimation:[
            'rotateX(90deg)','translate(500rem,-200rem) rotate(45deg)','rotateY(180deg)','scale(0.2)',
            'translate(0rem,200rem)'
            ],
        
        bas:['cubic-bezier(.2,.64,.59,1.68)','linear','ease','cubic-bezier(.21,1.93,.53,.64)'],


         sing:{},//当前的歌曲
    };
  },
  props:{
      w:{
          type:String,
          default:'530rem'
      },
      h:{
         type:String,
         default:'200rem'
      }
  },
  methods: {

      add(item,index){
        let id=this.isadd.findIndex(it=>{
             return it==index
         })
        if(id!=-1)return
         item.music.push(this.sing)
         let string=JSON.stringify(this.dataArr)
         localStorage.setItem('dataArr',string);
         this.$bus.$emit('updatelike',this.dataArr)
         this.close()
      },

      back(){
          document.querySelector('.addbox .add').style.background='white'
      },

      //input懒加载
      lazy(){
          if(this.msg.trim()){
            let obj={}
            obj.name=this.msg
            obj.id=this.dataArr.length
            obj.music=[]
            obj.music.push(this.sing)
            this.dataArr.push(obj)
            let string =JSON.stringify(this.dataArr)
            localStorage.setItem('dataArr',string);
            this.$bus.$emit('updatelike',this.dataArr)
            this.msg='' 
            
            //重新计算
            let number=Math.ceil(((document.querySelectorAll('.write').length+1)/3))
            this.height=number*50+75+(number+1)*20 +'rem'
            this.obj.height=this.height
            this.close()
          }
          document.querySelector('.addbox .add').style.background='transparent'
         

      },

         close(){

             let random1=Math.floor(Math.random()*this.origin.length)
            let random3=Math.floor(Math.random()*this.outAnimation.length)
            let random4=Math.floor(Math.random()*this.bas.length)
              this.obj={
                width:this.w,
                height:this.height,
                transition:'all 500ms '+this.bas[random4],
                transform:this.outAnimation[random3],
                transformOrigin:this.origin[random1],
                opacity:0,
                display:'block'
            }


             setTimeout(()=>{
                this.obj={
                    width:this.w,
                    height:this.height,
                    display:'none'
                } 
             },400)
         }   
    },
  components: {

    },
    computed:{
       

    },
    watch:{
        // sing(){
        //      let data=localStorage.getItem('dataArr')
        //      this.dataArr=JSON.parse(data)
        // }
    },



    mounted(){
        let number=Math.ceil((document.querySelectorAll('.write').length/3))
       this.height=number*50+75+(number+1)*20 +'rem'
       
    },
    created() {
       
       //请求本地存储的数据
        let data=localStorage.getItem('dataArr')
        if(!data){
            this.dataArr=[{name:'试听列表',id:0,music:[]}, {name:'我的收藏',id:1,music:[]},{name:'银河光子龙',id:2,music:[]}]
             let string=JSON.stringify(this.dataArr)
             localStorage.setItem('dataArr',string);
        }else{
           this.dataArr=JSON.parse(data)
        }
        


    this.$bus.$on('addLike',(flag,obj)=>{
      
        this.sing=obj
        this.title=obj.name
        this.isadd.length=0
        let data=localStorage.getItem('dataArr')
        this.dataArr=JSON.parse(data)
        
        

        setTimeout(()=>{
            //重新计算高度
            let number=Math.ceil(((document.querySelectorAll('.write').length+1)/3))
            this.height=number*50+75+(number+1)*20 +'rem'
            this.obj.height=this.height

            this.dataArr.forEach((item,index)=>{
                let id=item.music.findIndex(it=>{
                    return it.id==obj.id
                })
                if(id!=-1){
                    document.querySelectorAll('.write')[index].style.background='#E2DFE3'
                    this.isadd.push(index)
                }else{
                    document.querySelectorAll('.write')[index].style.background=''
                }
            })
        },0)
        

        


        
        //改变样式
        let random1=Math.floor(Math.random()*this.origin.length)
        let random2=Math.floor(Math.random()*this.late.length)
        let random4=Math.floor(Math.random()*this.bas.length)   
        if(flag){
            this.obj= {
                width:this.w,
                height:this.height,
                transformOrigin:this.origin[random1],
                transform:this.late[random2],
                display:'block',
                opacity: 0, 
            }

             setTimeout(()=>{
                this.obj={
                width:this.w,
                height:this.height,
                transition:'all 500ms '+this.bas[random4],
                display:'block',
                opacity: 1,
                }
           },0)
        }else{
            this.close() 
        }



      })

    },
}
</script>

<style  scoped>
 .Card{
      background: white;
      position: fixed;
      border-radius: 10rem;
      overflow: hidden;
      top: 0rem;
      left: 0rem;
      right: 0rem;
      bottom: 0rem; 
      margin: auto;
      display: none;
      z-index: 999;
      color:black;
}

.title{
    width: 100%;
    height: 25rem;
    border-top-left-radius: 10rem;
    border-top-right-radius: 10rem;
    background:  rgba(48,72,98,1);
    
    clear: both;
}
.title span{
    width: 20rem;
    height: 25rem;
    display: block;
    float: right;
    font-size: 25rem;
    font-weight: 600;
    margin-right: 10rem;
    line-height: 20rem;
    color: white;
    cursor: pointer;
    
}
.content{
    width: 100%;
    height: 50rem;
    line-height: 50rem;
    text-align: center;
}


.body{
    width: 100%;
    height: calc(100% - 75rem);
}

.body .write,.body .add{
    width: 150rem;
    height: 50rem;
    outline: none;
    text-align: center;
    padding: 0 10rem;
    float: left;
    border: none;
    margin: 20rem 0rem 0rem 20rem;
    background:  rgba(48,72,98,.3);
    position: relative;
    cursor: pointer;
    transition: all 200ms;
    line-height: 50rem;

    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.body .addbox{
    width: 150rem;
    height: 50rem;
    outline: none;
    text-align: center;
    padding: 0 10rem;
    float: left;
    border: none;
    margin: 20rem 0rem 0rem 20rem;
    position: relative;

    background: white;
    border: 1rem dashed rgba(48,72,98,1);
}
.body .addbox span{
    font-size: 20rem;
    display: block;
    width: 20rem;
    height: 20rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-5rem);
    color:rgba(48,72,98,1);
}

.body .add{
    width: 100%;
    height: 100%;
    margin: 0rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    background: rgba(0, 0,0,0);
}

.body .write:hover{
   background:  rgba(48,72,98,.6);
     
}


/* .box {
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(auto-fill, 153rem);
    grid-gap: 10rem;
    .box-info {
      position: relative;
      width: 153rem;
      height: 140rem;
      }
 } */
</style>