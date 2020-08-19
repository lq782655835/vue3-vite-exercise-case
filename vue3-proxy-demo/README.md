# vue3 + proxy的简易版实现 

## 梳理

- `reactive`通过proxy包装对象，在get中触发`track`收集依赖
- `effect`通过执行回调函数缓存依赖函数，在执行过程中，触发proxy的get，将缓存的依赖通过track放入依赖组中
- `computed`通过执行`effect`将其回调函数放入依赖组中，并通过对象的get属性实时获取计算属性的值
- 在触发赋值操作时，通过`trigger`触发依赖执行

## proxy-demo-easy

> 去掉多余的包装，单纯为实现基础逻辑的代码。用于梳理实现思路

## proxy-demo

> 通过装饰着模式，对`run`函数进行包装，区别compued的函数和effect函数，并且加上函数属性。