
import {Button,Progress,empty,pagination,message} from 'ant-design-vue';
import Vue from 'vue'
import App from './App.vue'
import 'assets/css/base.css'
import router from './router/index'
import  store from './store/index'
import mymixin from 'common/mymixin.js'
import createMount from './init'

require('./common/fitlayout.js')


Vue.component(Button.name, Button);
Vue.component(Progress.name,Progress)
Vue.component(empty.name,empty);
Vue.component(pagination.name,pagination)

Vue.config.productionTip=false
Vue.prototype.$bus=new Vue()
Vue.prototype.$message=message
Vue.use(mymixin)



//配置全局的message
message.config({
  top: `300px`,
  duration: 2,
  maxCount: 1,
})

function mount(){//init初始化后执行该函数
  new Vue({
    render: h => h(App),
    router,
    store,
  }).$mount('#app')
}
createMount(mount)


