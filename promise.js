class Promise {
    constructor(executor) {
        this.state = 'pending',this.onResolvedCallbacks = [],this.onRejectedCallbacks = []
        let resolve = value => {if (this.state === 'pending') this.state = 'fulfilled',this.value = value,this.onResolvedCallbacks.forEach(fn => fn())}
        let reject = reason => {if (this.state === 'pending') this.state = 'rejected',this.reason = reason,this.onRejectedCallbacks.forEach(fn => fn())}
        try {executor(resolve, reject)} catch (err) {reject(err)}}
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            let s=() => {try {resolvePromise(promise2, onFulfilled(this.value), resolve, reject)} catch (e) {reject(e)}}
            let j=() => {try {resolvePromise(promise2, onRejected(this.reason), resolve, reject)} catch (e) {reject(e)}}
            switch (this.state) {
                case 'fulfilled':setTimeout(s, 0);break
                case 'rejected': setTimeout(j, 0);break
                case 'pending': this.onResolvedCallbacks.push(() => setTimeout(s, 0));this.onRejectedCallbacks.push(() => setTimeout(j, 0))}
        });return promise2}
    static resolve(val){return new Promise((resolve, reject) => resolve(val))}
    static reject(val){return new Promise((resolve, reject) => reject(val))}
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) return reject(new TypeError('Chaining cycle detected for promise'))
    let called=false
    if (x != null && (typeof x === 'object' || typeof x === 'function')) 
        try {let then = x.then
            if (typeof then === 'function') 
                then.call(x,y   => {if (called) return;called = true;resolvePromise(promise2, y, resolve, reject)},
                            err => {if (called) return;called = true;reject(err)})
            else resolve(x)}
        catch (err) {if (called) return;called = true;reject(err)}
    else resolve(x)}
