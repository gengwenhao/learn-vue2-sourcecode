/**
 * 这个文件是 Vue 构造器真正的定义
 */
import {initMixin} from './init'
import {stateMixin} from './state'
import {renderMixin} from './render'
import {eventsMixin} from './events'
import {lifecycleMixin} from './lifecycle'
import {warn} from '../util/index'

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 在使用 new Vue(options) 后，构造函数内部立马调用了 _init(options) 方法进行初始化
  this._init(options)
}

// 项目源码封装了一些 mixin 分别调用后，挂在了 Vue 的原型上
initMixin(Vue) // initLifecycle、initEvents、initRender、callHook、initInjections、initState、initProvide、callHook
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
