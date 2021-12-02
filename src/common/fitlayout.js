import {debounce} from './public'


(function flexible (window, document) {
    var docEl = document.documentElement //文档对象根元素的只读属性
    var dpr = window.devicePixelRatio || 1 //获取设备dpr
  
    // adjust body font size
    function setBodyFontSize () {
      if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
        //浏览器有最小字体限制，css在pc上font-size是12，也就是css像素是12，其DPR为1，在移动端dpr有可能为2和3，为了保证字体不变小，需要用12*dpr进行换算。在普通屏幕下1个CSS像素对应1个物理像素，而在Retina屏幕下，1个CSS像素对应的却是4个物理像素。
      }
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    setBodyFontSize(); //在html文档加载和解析完成后设置body元素字体大小
  
    // set 1rem = viewWidth / 10
    function setRemUnit () { //将页面元素分为100份，每份为a，1rem=10a
      //当前视口宽度,在当前视口开发做到根标签为1px,达到1rem=1px,从而使用rem相似用px
      const CVW=1280 

      let w=docEl.clientWidth
      if(w<=800){
        document.body.style.backgroundSize='800px auto'
        w=800
      }else{
        document.body.style.backgroundSize='100% 100%'
      }
      var rem = w / CVW //最小宽度800
      docEl.style.fontSize = rem + 'px'
      
    }
  
    setRemUnit()
    window.addEventListener('resize',debounce(setRemUnit,200),false)

    // reset rem unit on page resize
    window.addEventListener('pageshow', function (e) { //当一条会话历史纪录被执行的时候出发事件，包括后退/前进按钮，同时会在onload页面触发后初始化页面时触发
      if (e.persisted) {
        setRemUnit()
      }
    })
  //当页面缩放/前进/后退的时候调整rem大小
  
  
    // detect 0.5px supports
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) { //offsetHeight返回元素像素高度，高度包含元素边框/内边距和水平滚动条
        docEl.classList.add('hairlines')//只读属性，返回一个类属性的实时DOMTokenList集合
  
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))