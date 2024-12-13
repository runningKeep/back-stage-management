export const throttle = (fn,time)=>{
  let t1,t2
  return (...args)=>{
    if(!t1){
      t1 = setTimeout(() => {
        fn(args)
        t1=null
      }, time);
    }
  }
}
export const deBounce = (fn,time)=>{
  let t1,t2
  return (...args)=>{
    if(!t1){
      t1 = setTimeout(() => {
        fn(args)
        t1=null
      }, time);
    }else{
      clearTimeout(t1)
      t1 = setTimeout(() => {
        fn(args)
        t1=null
      }, time);
    }
  }
}