import{ref,toRefs} from'vue'
export default function useCounter(finalNum,duration) {
  let timeArr = []
  let total = 0
  let piece = 30
  while(total<duration){
    let num = duration/piece
    if(total+num>duration){
      num = duration-total
    }else{
      total+=num
    }
    timeArr.push(num)
    piece-=2
  }
  let part = 30
  let timePice = duration/part
  let count = ref(0)
  let circle = setInterval(() => {
    part-=2
    count.value = Math.min(finalNum,Math.ceil(count.value+finalNum/28))
    if(count.value===finalNum) clearInterval(circle)
  }, timePice);
return count
}