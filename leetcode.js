const add = (a,b) => a+b;
const memoize = function (func, content) {
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    console.log(cache,'cc')
    console.log(key,'key')
    console.log( key instanceof Array,'type')
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}
let a = setTimeout(() => {
  
}, 1000);

setInterval(() => {
  console.log(a,'a')
}, 1000);