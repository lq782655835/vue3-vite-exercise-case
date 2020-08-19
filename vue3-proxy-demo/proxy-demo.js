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
        effect: runner,
        get value() {
            return runner();
        }
    };
}

function effect(fn, options = {}) {
   let effect = createReactiveObject(fn, options);
   if (!options.lazy) {
        effect();
   }
   return effect;
}

function createReactiveObject(fn, options) {
    let effect = function() {
       return run(effect, fn);
    }
    effect.deps = [];
    effect.computed = options.computed || false;
    effect.lazy = options.lazy || false;
    return effect;
}

function run(effect, fn) {
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(fn)
            return fn();
        } finally {
            effectStack.pop();
        }
    }
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
    let depMap = targetStack.get(target);
    if (!depMap) {
        return;
    }
    let deps = depMap.get(key);
    if (!deps) {
        return;
    }
    let effects = new Set();
    let computedEffects = new Set();
    deps.forEach(v => {
        if (v.computed) {
            computedEffects.add(v);
        } else {
            effects.add(v);
        }
    });
    effects.forEach(v => v());
    computedEffects.forEach(v => v());
}