<template>
  <Ref msg="Ref 3.0 + Vite" />
  <Reactive msg="Reactive 3.0 + Vite"/>
  <WatchEffect />

  <TodoInput @submit="submit"/>
   <!-- /* 命名为change时会触发额外的event事件，why？ */ -->
  <TodoStatus @change1="onStatusChanged" />
  <TodoList :list="showList" @toggle="onToggleStatus" @delete="onItemDelete" />
</template>

<script>
import Ref from './components/Ref.vue'
import Reactive from './components/Reactive.vue'
import WatchEffect from './components/WatchEffect.vue'

import TodoStatus from './components/todo/Status.vue'
import TodoInput from './components/todo/Input.vue'
import TodoList from './components/todo/List.vue'
import { reactive, computed, toRefs, watchEffect } from 'vue'

const VUE3_TODO_LS_KEY = 'VUE3_TODO_LS_KEY'
export default {
  name: 'App',
  components: {
    Ref,
    Reactive,
    WatchEffect,

    TodoStatus,
    TodoInput,
    TodoList
  },
  setup() {
    const data = reactive({
      todoList: JSON.parse(localStorage.getItem(VUE3_TODO_LS_KEY)) ?? [], // 支持最新ES 链式调用
      showingStatus: 'all',
      showList: computed(() => {
        return data.todoList.filter(item => {
          if (data.showingStatus === 'all') return true
          if (data.showingStatus === 'completed') return item.completed
          if (data.showingStatus === 'uncompleted') return !item.completed

          return true
        })
      })
    })

    watchEffect(() => {
      // 每次更新todoList，自动执行副作用函数
      localStorage.setItem(VUE3_TODO_LS_KEY, JSON.stringify(data.todoList ?? []))
    })

    const submit = (content) => data.todoList.push({
        completed: false,
        content,
        id: parseInt(Math.random(0, 1) * 100000)
      })

    const onStatusChanged = status => {
      console.log(status, 99)
      data.showingStatus = status
    }
    const onToggleStatus = ({ id, isChecked }) => data.todoList.forEach(item => item.id === id && (item.completed = isChecked))
    const onItemDelete = (id) => data.todoList.splice(data.todoList.findIndex(item => item.id === id), 1)
    return {
      ...toRefs(data),
      submit,
      onStatusChanged,
      onToggleStatus,
      onItemDelete
    }
  }
}
</script>

<style>
body {
  h1 {
    color: #FFF888;
  }
}
</style>