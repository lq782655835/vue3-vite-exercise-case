<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }} / {{double}}</button>
</template>

<script>
import { ref, onMounted, watchEffect, computed, reactive } from 'vue'
export default {
  props: {
    msg: String
  },
  setup(props) {
    let count = ref(0)
    let double = computed(() => {
      if (count.value > 3) {
        return 2 * count.value
      }
      return count.value
    })

    // watch中可以做任何函数，而不一定只监听固定值
    watchEffect(() => {
      console.log(count.value) // 只要里面有ref/reactive，即可被getter依赖收集
    })
    // 可以多次onMounted，其实就是this.
    onMounted(() => {
      console.log(1123213, props)
    })
    onMounted(() => {
      console.log(33333)
    })
    return {
      count,
      double,
    }
  }
  // name: 'HelloWorld',
  // props: {
  //   msg: String
  // },
  // data() {
  //   return {
  //     count: 0
  //   }
  // }
}
</script>
