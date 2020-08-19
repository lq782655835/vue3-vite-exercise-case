<template>
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ count }}</button>
</template>

<script lang="ts">
/* 
  所有现有的生命周期钩子都会有对应的 onXXX 函数（只能在 setup() 中使用），去除created、beforeCreate。
*/
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

export default {
  name: 'Lifecycle',
  props: {
    msg: String
  },
  setup() {
    /**
      2.x与 3.x对比：
        beforeCreate -> use setup()
        created -> use setup()
        beforeMount -> onBeforeMount
        mounted -> onMounted
        beforeUpdate -> onBeforeUpdate
        updated -> onUpdated
        beforeDestroy -> onBeforeUnmount
        destroyed -> onUnmounted
        errorCaptured -> onErrorCaptured
      新增了两个调试钩子：
        onRenderTracked
        onRenderTriggered
        两个钩子函数都接收一个 DebuggerEvent，与 watchEffect 参数选项中的 onTrack 和 onTrigger 类似
    */
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onActivated(() => {
      console.log('onActivated')
    })
    onDeactivated(() => {
      console.log('onDeactivated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
    onErrorCaptured(() => {
      console.log('onErrorCaptured')
    })
    onRenderTracked(() => {
      console.log('onRenderTracked')
    })
    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    })

    const count = ref(0)
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
