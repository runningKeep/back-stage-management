self.onmessage = (e) => {
  const userNum = Number(e.data);
  // fibonacci(userNum);
  console.log(e.data,'2');
  let {data} = e
  if(data.type==='1'){
    let num = Number(data.data)
    fibonacci(num)
  }else if(data.type==='2'){
    calc()
  }
  
};

function fibonacci(num) {
  let a = 1;
  let b = 0;
  while (num >= 0) {
    [a, b] = [a + b, a];
    num--;
  }

  self.postMessage({type:'1',data:b});
}
function calc(params) {
  let c = 0
    setInterval(()=>{
      for(let i=0;i<10000000;i++){
        c+=i
      }
      self.postMessage({type:'2',data:c})
      console.log(c,'c');
    },1000)
  
  return c
}
