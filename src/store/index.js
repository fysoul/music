import Vuex from 'vuex'
import Vue from 'vue'


import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'
import {search} from './search/search'
import {list} from './list/list'
Vue.use(Vuex)

const state={
    name:'fysoul音乐',
    rank:null,
    listSings:null,
    rankSings:null,
    netImg:[ 
        'https://wallpaperm.cmcm.com/778f4e45e878a64e06f1190f1625af98.jpg',
        'https://wallpaperm.cmcm.com/72a4576997bd6aaea7d7a276a1340de8.jpg',//夜空
        // 'https://wallpaperm.cmcm.com/9f8c405ea4f4db797d9f61c0e97d55f7.jpg',//Pixiv幻想曲
        'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/9442843a51b6a91dfa3ca496a4d44db8.jpg',//比安卡
        'https://wallpaperm.cmcm.com/3a1c14c4e2704bed0c579b4da8e3f830.jpg',
        'https://pic.dmjnb.com/pic/b1092613257dacef1816bf50b4193c69',//雨天 女孩
        'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/5e3909b2476425d904ce75a4f11b9dc8.jpg',
        'https://wallpaperm.cmcm.com/802810e4d692c75751ddd3d0b6c16c9a.jpg',//闭眼女孩
        'https://wallpaperm.cmcm.com/2fb9e283c60a92ea717e889135ca1df6.jpg',
        'https://wallpaperm.cmcm.com/a68d20e354e6d703b1f007dde85fdc7d.jpg',
        'https://wallpaperm.cmcm.com/70de9ab37f342963b6b144f47b1a7140.jpg'

        // require('assets/img/backimg/back1.jpg'),
        // require('assets/img/backimg/back2.jpg'),
        // require('assets/img/backimg/back3.jpg'),
        // require('assets/img/backimg/back4.jpg'),
        // require('assets/img/backimg/back5.jpg'),
        // require('assets/img/backimg/back6.jpg'),
        // require('assets/img/backimg/back7.jpg'),
        // require('assets/img/backimg/back8.jpg'),
        // require('assets/img/backimg/back10.jpg'),
        // require('assets/img/backimg/back12.jpg'),
        
    ],
    author:require('assets/img/aside/qyc.png')

}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        search:search,
        list
    } 
})

export default store