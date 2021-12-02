import VueRouter from 'vue-router'
import Vue from 'vue'
import {message} from 'ant-design-vue';

const Like=()=>import('../pages/like/Like')
const Home=()=>import('../pages/home/Home')
const List=()=>import('../pages/list/List')
const ListChild=()=>import('../pages/list/ListChild')
const Setting=()=>import('../pages/setting/Setting')
const Search=()=>import('../pages/search/Search')
const Down=()=>import('../pages/down/Down')
const Ranking=()=>import('../pages/ranking/Ranking')
Vue.use(VueRouter)

Vue.prototype.$bus=new Vue()

let  msg=0
const routes=[
    {
        path:'',
        redirect:'/search'
    },
    {
        path:'/home',
        component:Home,
        meta:{title:'主页',},
        name:'home'
    },
    {
        path:'/list',
        meta:{title:'歌单',},
        component:List,
        name:'list'
        // children:[
        //     {
        //     path:'listchild',
        //     component:ListChild,
        //     meta:{title:'xxx'}
        //    }
        // ]
           
        
    },
    
    {
        path:'/like',
        meta:{title:'喜欢',},
        component:Like,
        name:'like'
    },

    {
        path:'/setting',
        meta:{title:'设置',},
        component:Setting,
        name:'setting'
    },
    {
        path:'/search',
        meta:{title:'搜索',},
        component:Search,
        name:'search'
    },
    {
        path:'/down',
        meta:{title:'下载',},
        component:Down,
        name:'down'
    },
    {
        path:'/ranking',
        meta:{
            title:'排行榜',
        },
        component:Ranking,
        name:'ranking'
    },
    {

        path:'/listchild',
        component:ListChild,
        meta:{
            title:'xxx',
            keepAlive: false // 不需要被缓存
        },
        name:'listchild'

    },

]

const router=new VueRouter({
    routes,
    mode:'history',
})

router.beforeEach((to,from,next)=>{
    if(!to.name){
        router.replace('/search')
        return
    }



    if(to.name=='listchild'&&!to.params.res){
        router.replace('/list')
        return
    }
    if(to.name==from.name)return
    if(to.name!=='search')msg=message.loading('正在加载...',0) 
  next()
})

router.afterEach((to, from) => {
   
    setTimeout(msg,0)
})

export default router