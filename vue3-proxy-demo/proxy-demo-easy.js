let proxyHandle = {
    get(target, key, info) {
        //收集依赖
        track(target, key);
        if (typeof target[key] === 'object') {
            return reactive(target[key]);
        }
        return Reflect.get(target, key, info);
    },
    set(target, key, value, info) {
        Reflect.set(target, key, value, info);
         //执行依赖
        trigger(target, key);
    }
}
function reactive(o) {
    let observe = new Proxy(o, proxyHandle);
    return observe;
}

function computed(fn) {
    let runner = effect(fn, {computed: true, lazy: true});
    return {
        get value() {
            return runner();
        }
    };
}

function effect(fn, options = {}) {
    //返回函数，供computed使用
    let run = function () {
        try {
            effectStack.push(fn)
            return fn(); // fn中使用到proxy的get方法，所以get又会执行track
        } finally {
            effectStack.pop();
        }
    };
    //执行
    if (!options.lazy) {
        run();
    }
    return run;
}

let effectStack = [];
let targetStack = new WeakMap();

//收集依赖
function track(target, key) {
    let effect = effectStack[effectStack.length - 1];
    if (effect) {
        let depMap = targetStack.get(target);
        if (depMap === undefined) {
            depMap = new Map();
            targetStack.set(target, depMap)
        }
        let dep = depMap.get(key);
        if (dep === undefined) {
            dep = new Set();
            depMap.set(key, dep);
        }
        dep.add(effect);
    }
}

//提醒更新
function trigger(target, key) {
    let fns = targetStack.get(target).get(key);
    fns.forEach(v => v());
}