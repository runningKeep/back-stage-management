import{reactive,toRefs} from'vue'
let position = reactive({x:'',y:'',count:0})
document.addEventListener('mousemove',(e)=>{
  position.x = e.clientX
  position.y = e.clientY
})
document.addEventListener('click',()=>{
  position.count++
})
export default toRefs(position)