<template>
  <!-- 模板中不再限于单个根节点，render函数可以返回数组 -->
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ state.count }}</button>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'Basic',
  props: {
    msg: String
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  /**
   * setup 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。
   * 调用时机：创建组件实例，然后初始化 props ，紧接着就调用setup 函数。从生命周期钩子的视角来看，它会在 beforeCreate 钩子之前被调用
   * 第一个参数为 props，props不能解构。解构会失去响应性
   * 第二个参数提供了一个上下文对象，从原来 2.x 中 this 选择性地暴露了一些 property：attrs、emit、slots。
   * this 在 setup() 中不可用。由于 setup() 在解析 2.x 选项前被调用，setup() 中的 this 将与 2.x 选项中的 this 完全不同。
   */
  setup(props, { attrs, emit, slots }) {
    console.log('setup')
    
    /**
     * reactive
     * 接收一个普通对象然后返回该普通对象的响应式代理。等同于2.x的Vue.observable
     * 响应式转换是“深层的”：会影响对象内部所有嵌套的属性。基于 ES2015 的 Proxy 实现，返回的代理对象不等于原始对象
     */
    const state = reactive({
      count: 0
    })
    const add = () => {
      state.count++
    }

    // 暴露给模板使用
    return {
      state,
      add
    }
  }
}
</script>
