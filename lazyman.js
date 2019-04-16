LazyMan('Joe').sleepfirst(1500).eat('breakfast').sleep(2000).eat('dinner')

function LazyMan(name){
  return new class LazyMan{
    constructor(name){
      this.tasks=[]
      this.hello(name)
      setTimeout(this.next.bind(this),0)
    }
    log(str){console.log(str);return true}
    next(){
      var fn=this.tasks.shift()
      fn&&fn.apply(this)
    }
    hello(name){
      this.tasks.push(()=>this.log('hello '+name)&&this.next())
      return this
    }
    sleepfirst(time){
      this.tasks.unshift(()=>this.log('sleep '+time)&&setTimeout(this.next.bind(this),time))
      return this
    }
    eat(what){
      this.tasks.push(()=>this.log('eat '+what)&&this.next())
      return this
    }
    sleep(time){
      this.tasks.push(()=>this.log('sleep '+time)&&setTimeout(this.next.bind(this),time))
      return this
    }
  }(name)
}
