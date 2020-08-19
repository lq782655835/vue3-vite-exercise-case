<template>
  <Suspense>
    <template #default>
      <async-component :delay="3000" />
    </template>
    <template #fallback>
      <h1>加载中……</h1>
    </template>
  </Suspense>
</template>

<script>
import AsyncComponent from './AsynComponent.vue'

export default {
  components: {
    AsyncComponent
  }
}
</script>
