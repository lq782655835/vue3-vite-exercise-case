<template>
  <h1>我是异步组件</h1>
</template>

<script>
const sleep = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export default {
  props: {
    delay: {
      type: Number,
      required: true
    }
  },
  async setup(props) {
    await sleep(props.delay)
  }
}
</script>
