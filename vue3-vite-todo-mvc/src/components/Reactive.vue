<template>
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ count }} / {{double}}</button>
</template>

<script>
import { ref, onMounted, watchEffect, computed, reactive, toRefs } from 'vue'
export default {
  props: {
    msg: String
  },
  setup(props) {
    let state = reactive({
      count: 0,
      double: computed(() => {
        if (state.count > 3) {
          return 2 * state.count
        }
        return state.count
      })
    })

    watchEffect(() => {
      console.log(state.count)
    })
    watchEffect(() => {
      document.body.title = `count is ${state.count}`
    })
    const add = () => {
      state.count++
    }
    
    return {
      ...toRefs(state),
      // ...state, // 这种方式无法响应式
      add
    }
  }
}
</script>
