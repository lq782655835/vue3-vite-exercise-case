<template>
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ count }}</button>
</template>

<script lang="ts">
/* 
  watchEffect
  立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行改函数
  类型定义：
  function watchEffect(
    effect: (onInvalidate: InvalidateCbRegistrator) => void, // 清除副作用回调
    options?: WatchEffectOptions // 选项配置
  ): StopHandle // 返回一个停止函数

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync'               // 组件更新前调用 | 组件更新后调用（默认） | 同步调用 先后顺序：sync --> pre --> post
    onTrack?: (event: DebuggerEvent) => void      // 仅在开发模式下生效：当一个 reactive 对象属性或一个 ref 作为依赖被追踪时，将调用 onTrack
    onTrigger?: (event: DebuggerEvent) => void    // 仅在开发模式下生效：依赖项变更导致副作用被触发时，将调用 onTrigger
  }

  interface DebuggerEvent {
    effect: ReactiveEffect
    target: any
    type: OperationTypes
    key: string | symbol | undefined
  }

  type InvalidateCbRegistrator = (invalidate: () => void) => void

  type StopHandle = () => void  // 停止watch的函数
*/
import { ref, watchEffect, onMounted, onUpdated } from 'vue'

export default {
  name: 'WatchEffect',
  props: {
    msg: String
  },
  setup() {
    /* ---------------基本使用---------------- */
    const count = ref(0)
    watchEffect(() => console.log('基本使用', count.value)) // -> 立即执行，log 0


    /* ---------------停止 Watcher---------------- */
    /* 
      当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时， 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。
      同时，watchEffect 函数返回一个停止watch的函数，供你手动停止watch   
    */
    const stop = watchEffect(() => {
      console.log('调用后停止', count.value)
    })
    stop() // 调用停止函数，清除对应的监视


    /* ------------------清理副作用-------------------- */
    /* 
      清理副作用：组件销毁时、手动stop监听时，以及下次触发watchEffect时执行
      熟悉react 的useEffect的同学就知道，useEffect可以return 一个函数来清理自身的副作用，而Vue3.0是以参数的形式。
      一般情况下，在生命周期销毁阶段或是你手动stop这个监听函数的情况下，都会自动清理副作用。
      但是有时候，当观察的数据源变化后，我们可能需要执行一些异步操作，如setTimeOut,fetch，
      当这些异步操作完成之前，监测的数据源又发生变化的时候，我们可能要撤销还在等待的前一个操作，比如clearTimeOut。
      为了处理这种情况，watchEffect接收一个fn参数，可以注册一个回调函数来清除副作用 
    */
    watchEffect((onInvalidate) => {
      console.log('清除副作用结束，执行watch', count.value) // 立即执行
      onInvalidate(() => {
        console.log('开始清除副作用') // 下次触发watch前执行
      })
    })


    /* ------------------回调时机-------------------- */
    /*
      默认情况下，所有的 watch 回调都会在当前的 renderer flush 之后被调用。这确保了在回调中 DOM 永远都已经被更新完毕。
      如果你想要让回调在 DOM 更新之前或是被同步触发，可以传递一个拥有 flush 属性的对象作为选项（默认为 'post'）控制watch回调调用时机
      flush表示回调调用时机，有三个值：
        post 默认值，在组件更新之后
        pre 组件更新之前
        sync 同步调用   
        先后顺序：sync --> pre --> post        
    */
    onMounted(() => {
      console.log("onMounted")
    })
    onUpdated(() => {
      console.log("onUpdated")
    })
    watchEffect(() => {
      console.log('组件更新后执行', count.value)
    }, { flush: 'post' })
    watchEffect(() => {
      console.log('组件更新前执行', count.value)
    }, { flush: 'pre' })
    watchEffect(() => {
      console.log('同步执行', count.value)
    }, { flush: 'sync' })


    /* ------------------侦听器调试-------------------- */
    /**
      onTrack 和 onTrigger 选项可用于调试一个侦听器的行为。
      当一个 reactive 对象属性或一个 ref 作为依赖被追踪时，将调用 onTrack
      依赖项变更导致副作用被触发时，将调用 onTrigger
      onTrack 和 onTrigger 仅在开发模式下生效。
    */
    watchEffect(() => {
      console.log('触发更新', count.value)
    }, {
      onTrigger(e) {
        console.log('侦听器触发') // 同步执行后、组件更新前执行
      }
    })


    const add = () => {
      count.value++
    }
    return {
      count,
      add
    }
  }
}
</script>
