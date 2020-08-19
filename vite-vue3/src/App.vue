<template>
  <div class="container">
    <ul class="side" @click="onSwitch">
      <li v-for="c in examples" :key="c" :class="{'active': c === comp}">{{ c }}</li>
    </ul>
    <div class="main">
      <h1>x: {{x}}, y: {{y}}</h1>
      <component :is="comp" :msg="comp"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Basic from './components/Basic.vue'
import Ref from './components/Ref.vue'
import Computed from './components/Computed.vue'
import WatchEffect from './components/WatchEffect.vue'
import Watch from './components/Watch.vue'
import Lifecycle from './components/Lifecycle.vue'
import TeleportDemo from './components/Teleport.vue'
import SuspenseDemo from './components/suspense/SuspenseDemo.vue'
import useMousePosition from './mouse'

export default {
  name: 'App',
  components: {
    Basic,
    Ref,
    Computed,
    WatchEffect,
    Watch,
    Lifecycle,
    TeleportDemo,
    SuspenseDemo
  },
  setup() {
    const examples = ['Basic', 'Ref', 'Computed', 'WatchEffect', 'Watch', 'Lifecycle', 'TeleportDemo', 'SuspenseDemo']
    const comp = ref('Basic')
    const onSwitch = (e) => {
      comp.value = e.target.innerText
    }

    const { x, y } = useMousePosition()
    return {
      x,
      y,
      examples,
      comp,
      onSwitch
    }
  }
}
</script>

<style>
.container {
  display: flex;
}

ul, li {
  list-style: none;
  margin: 0;
  padding: 0
}

.side {
  text-align: left;
  padding: 24px;
}

.side li {
  margin-bottom: 8px;
  cursor: pointer;
}

.side li.active {
  color: #3274e6
}

.main {
  flex: 1;
  text-align: center;
}
  
</style>
