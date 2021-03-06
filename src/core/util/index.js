/* @flow */

// util 包中定义了 Vue 需要使用的各种工具
export * from 'shared/util'
export * from './lang'
export * from './env'                                       // env 中的工具用来检测宿主环境和相关信息
export * from './options'
export * from './debug'
export * from './props'
export * from './error'
export * from './next-tick'
export {defineReactive} from '../observer/index'
