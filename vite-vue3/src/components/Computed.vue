<template>
  <h1>{{ msg }}</h1>
  <button @click="add">plusOne is: {{ plusOne }}</button>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  name: 'Computed',
  props: {
    msg: String
  },
  setup() {
    const count = ref(0)

    /**
       类型定义：
        // 只读的
        function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

        // 可更改的
        function computed<T>(options: {
          get: () => T
          set: (value: T) => void
        }): Ref<T> 
     */

    // computed 传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象
    const plusOne = computed(() => {
      return count.value + 1
    })

    // computed 传入一个拥有 set 和 get 函数的对象，创建一个可手动修改的计算状态
    const plusTwo = computed({
      get: () => count.value + 2,
      set: val => {
        count.value = val - 2
      }
    })


    const add = () => {
      count.value++
    }

    // 暴露给模板使用
    return {
      plusOne,
      add
    }
  }
}
</script>
