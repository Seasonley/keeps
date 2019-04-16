let pip=(...fn)=>fn.reduce((fn1,fn2)=>(...args)=>fn2(fn1(...args)))
let compose=(...fn)=>fn.reduceRight((fn1,fn2)=>(...args)=>fn2(fn1(...args)))
let curry=(fn, args = []) =>function(){
        let rest = [...args, ...arguments]
        return  rest.length < fn.length
                    ?curry.call(this,fn,rest)
                    :fn.apply(this,rest)
    }

let applyAsync = (acc,val) => acc.then(val);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
var memoize = function(func, hasher) {
    var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!cache[address]) {
            cache[address] = func.apply(this, arguments);
        }
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
};