
import Loading from './Loading.vue'

//所谓vue的插件，就是一个js对象
let myplugin={
    install:function(Vue){

        let element=null
        if(!element){
           let component=Vue.extend(Loading)
           element=new component({
                   el:document.createElement('div')
               })
            document.body.appendChild(element.$el)
           
        }
        element.show=true

        let watch={
            xian(){
                element.show=true
            },
            hide(){
                element.show=false
            },
            change(){
                element.w= element.w+10
                element.h= element.h+10
            }
        }

        

        Vue.prototype.$show=watch
        Vue.prototype.$wh=element.wh
        Vue.prototype.$text=element.test1
        







        // 添加属性与方法
        //这里我写的$testProp等加了$符号的，表示他为vue全局的，但实际上不加也可以的，访问时也不加就行了
        Vue.prototype.$myoption='我是来自插件的属性',
        Vue.prototype.$myfn=function(){
            console.log('我是来自插件的方法')
        }
        // 添加全局混入
        Vue.mixin({
            mounted() {
                console.log('组件创建成功')
            },
        })
        // 添加全局指令
        Vue.directive('dir',{
            inserted:function(ele){
                ele.style.border='2px solid green'
            }
        })
    }
}
export default myplugin;
