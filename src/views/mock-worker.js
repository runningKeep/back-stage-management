import Mock from 'mockjs'
let mock = Mock.mock({
 "array|200": [
   {
     "name": ()=>Mock.Random.first(),
    //  "height|160-250":180,
     "age|1-128": 1,
     "address":()=>Mock.Random.region(),
     "province":()=>Mock.Random.province(),
     "cname":()=>Mock.Random.cname(),
     "ifShow|1":true
    //  "img":()=>Mock.Random.dataImage('50x20',''),
   }
 ]
})
self.postMessage(mock)