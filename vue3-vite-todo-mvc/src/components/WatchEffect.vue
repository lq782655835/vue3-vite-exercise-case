
<template>
    <div>
        <h1>{{ msg }}</h1>
        <button @click="onBtnClick">click: {{ refNum }} / {{name}}</button>
    </div>
</template>

<script>
import { ref, reactive, isRef, toRefs, watchEffect, watch } from 'vue';
export default {
    props: {
        msg: String
    },
    setup() {
        let refNum = ref(0)
        let state = reactive({ name: 'leo', age: 19 })
        console.log(isRef(state.name)) // false
        console.log(isRef(refNum)) // true
        const onBtnClick=() => {
            refNum.value += 1
            state.name += '1'
        }

        // 简易watch：副作用函数
        watchEffect(() => {
            console.log(state.name) // leo
        })
        
        // 侦听器的数据源可以是一个拥有返回值的 getter 函数，也可以是 ref
        watch(() => refNum.value, (val, preVal) => {
            console.log('changed refNum', val, preVal)
        })
        watch(refNum, (val, preVal) => {
            console.log('changed refNum by ref', val, preVal)
        })
        // 对于reactive.xxx对象，这里一定要是函数对象
        watch(() => state.name, (val, preVal) => {
            console.log('changed name', val, preVal)
        })
        // 对于reactive对象（引用对象），此时val和preValue是相同的
        watch(state, (val, preVal) => {
            console.log(val===preVal) // true
        })
        // 也可以是一个数组
        watch([refNum, () => state.name], ([numValue, nameValue], [numPreValue, preNameValue]) => { // 数组
            console.log(numValue, numPreValue, nameValue, preNameValue)
        })
        return {
            refNum,
            ...toRefs(state),
            onBtnClick
        }
    }
}
</script>