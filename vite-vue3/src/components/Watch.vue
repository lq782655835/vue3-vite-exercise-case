<template>
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ count }}</button>
</template>

<script lang="ts">
/* 
  watch
  watch API 完全等效于 2.x this.$watch （以及 watch 中相应的选项）。watch 需要侦听特定的数据源，并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源变更时才执行回调。
  对比 watchEffect，watch 允许我们：
    懒执行副作用；
    显式指定侦听的状态，更明确哪些状态的改变会触发侦听器重新运行副作用；
    访问侦听状态变化前后的值。
  
  类型定义：
  // 侦听单数据源
  function watch<T>(
    source: WatcherSource<T>,                             // 数据源
    callback: (
      value: T,                                           // 新值
      oldValue: T,                                        // 旧值
      onInvalidate: InvalidateCbRegistrator               // 清除副作用函数
    ) => void,
    options?: WatchOptions
  ): StopHandle

  // 侦听多数据源
  function watch<T extends WatcherSource<unknown>[]>(
    sources: T
    callback: (
      values: MapSources<T>,
      oldValues: MapSources<T>,
      onInvalidate: InvalidateCbRegistrator
    ) => void,
    options? : WatchOptions
  ): StopHandle

  type WatcherSource<T> = Ref<T> | (() => T)

  type MapSources<T> = {
    [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
  }

  // 共有的属性 请查看 `watchEffect` 的类型定义
  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false                  // 立即执行，默认懒执行
    deep?: boolean                                         // 深度监听
  }
*/
import { reactive, ref, watch, toRefs } from 'vue'

export default {
  name: 'Watch',
  props: {
    msg: String
  },
  setup() {
    /* ---------------侦听单个数据源---------------- */
    /**
     * 侦听器的数据源可以是一个拥有返回值的 getter 函数，也可以是 ref
     */
    // 侦听一个 getter
    const state = reactive({ count: 0 })
    watch(
      () => state.count,
      (count, prevCount) => {
        console.log('侦听一个 getter')
      }
    )
    // 直接侦听一个 ref
    const count = ref(0)
    watch(count, (count, prevCount) => console.log('侦听一个 ref'))
  

    /* ---------------侦听多个数据源---------------- */
    const human = reactive({
      male: 5,
      female: 6
    })
    const { male, female } = toRefs(human)
    watch([male, female], ([male, female], [prevMale, prevFemale]) => {
      console.log('侦听多个数据源')
    }, { immediate: true })


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
