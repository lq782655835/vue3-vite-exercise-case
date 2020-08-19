<template>
  <h1>{{ msg }}</h1>
  <!-- 当 ref 作为渲染上下文的属性返回（即在setup()返回的对象中）并在模板中使用时，
    它会自动解套，无需在模板内额外书写 .value
   -->
  <button @click="add">count is: {{ count }}</button>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Ref',
  props: {
    msg: String
  },
  setup() {
    /**
     * ref
     * 接收一个参数值并返回一个响应式且可改变的ref对象。ref对象拥有一个指向内部值的单一属性.value
     *  一般而言，这里的元素参数指 基本元素 或者称之为 inner value，
        如：number, string, boolean,null,undefied 等，object 一般不使用 ref，而是使用上文的 reactive。
        也就是说 ref 一般适用于某个元素的；而 reactive 适用于一个对象。
        ref 也就相当于把单个元素转换成一个 reactive 对象了，对象默认的键值名是：value。
     */
    const count = ref(0)
    const add = () => {
      count.value++ // 访问ref() 创建出来的响应式数据对象的值，需要.value
    }

    // 暴露给模板使用
    return {
      count,
      add
    }
  }
}

/**--------------------------总结---------------------- */

/**
   1. ref 和 reactive 的区别
   ref背后是通过reactive 实现的，唯一的区别是ref返回的是包装对象
   const count =  ref(0) 等价于 const count = reactive({value: 0})
 */

/**
   2. 为什么 ref 要返回一个包装对象
   在Javascript中，基础数据类型如string和number是只有值，没有引用的。
   如果在一个函数中返回一个字符串变量，接收到这个字符串的代码只会获得一个值，是无法追踪原始变量后续的变化的。
   因此，包装对象的意义就在于提供一个让我们能在函数之间以引用的方式传递任意类型值的容器。
   这有点像react hooks中的useRef，不同的是vue的包装对象同时还是响应式数据源。
   因此我们就可以在封装了逻辑的组合函数中将状态以引用方式传回给组件，组件负责展示（追踪依赖），组合函数负责管理状态（触发更新）
   setup() {
     const valueA = useLogicA()
     const valueB = useLogicB()
     return {
       valueA,
       valueB
     }
   }
 */

/**
   3. ref 和 reactive 需要注意的点
   在setup函数中，如果通过解构返回reactive对象，会丢失响应性，及在模板渲染上下文中，获取不到他们的响应式变化
   可使用 toRef 或者 toRefs 对 reactive 对象进行解构

   const state = reactive({
     foo: 1,
     bar: 2,
   })
   const fooRef = toRef(state, 'foo')  // toRef 可以用来为一个 reactive 对象的属性创建一个 ref。这个 ref 可以被传递并且能够保持响应性。

   const stateAsRefs = toRefs(state)   // 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。

   stateAsRefs 的类型如下:
    {
      foo: Ref<number>,
      bar: Ref<number>
    }
 */
</script>
