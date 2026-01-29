<script setup>
import axios from 'axios'
 import {ref,reactive,onMounted} from 'vue'
 import SparkMD5 from 'spark-md5';
 const fileList = ref([])
 let imgsrc = ref('')
 let dialogVisible = ref(false)
 const handlePreview = (file)=>{
  let id = file.response.name
  window.open(`http://127.0.0.1:3000/${id}`)
  // axios.get(`/api/${id}`)
  console.log(file);
  dialogVisible.value = true
  imgsrc.value = `http://127.0.0.1:3000/${id}`
}
 const handleExceed = ()=>{

 }
 const handleRemove = (file)=>{
    console.log(file);
 }
 const beforeRemove = ()=>{

 }
 const download  = ()=>{
  // axios.get('/api/upload/download')
  window.open('http://127.0.0.1:3000/upload/download?id=f35c702c-9d68-4114-8259-933220491d99')
 }

 const tableData = ref([])
 let total = ref(0)
 const currentPage1 = ref(1)
 const pageSize = ref(10)
 const search = ()=>{
  axios.get('/api/upload/list',{
    params:{
      pageNo:currentPage1.value,pageSize:pageSize.value
    }
  }).then(res=>{
    console.log(res,'res');
    tableData.value = res.data.rows
    total.value = res.data.total
  })
 }
 const handleCurrentChange = ()=>{
  search()
 }
 const handleSizeChange = ()=>{
  search()
 }
 search()
 const handleDelete = (row)=>{
  axios.post('/api/upload/delete',{id:row.id}).then(search)
 }
 const handleDownload = ({id})=>{
  window.open(`http://127.0.0.1:3000/upload/download?id=${id}`)
 }

onMounted(()=>{
  let fileInput = document.querySelector('#upload')
  fileInput.addEventListener('change',async (file)=>{
  console.log(fileInput);
  console.log(fileInput.files);
  let files = fileInput.files[0]
  console.log(files.size);
  let fileBlob = sliceFile(files,1024*1024*100)
  console.log(fileBlob,'--')
  // sendFile(fileBlob,files)
  let start = new Date().getTime()
  const {allHash,chunkList} = await hash(fileBlob)
  let endtime = new Date().getTime()
  let time = (endtime-start)/1000
  console.log(time,'time/s')
  console.log(allHash,'hashCode');
  console.log(chunkList,'chunkList');
})

})
const sendFile = (blobs)=>{
  for(let data of blobs){
    let formData = new FormData();
    formData.append('file',data)
    for(let val of formData){
      console.log(val,'cvv');
    }
    formData.append('param',0)
    formData.append('param',2)
    fetch('/api/upload',{
      method:'post',
      body:formData
    }).then(res=>{
      console.log(res);
    })
  }
  let files = document.getElementById('upload').files[0];

//     var xhr = new XMLHttpRequest(); //创建对象

//     xhr.open("POST", "/api/upload"); //链接改成你项目中的
//     // xhr.setRequestHeader("Authorization", token);  //令牌改成你项目中的
//     xhr.send(formData); //发送时  Content-Type默认就是: multipart/form-data; 
//     xhr.onreadystatechange = function() {
//         console.log('state change', xhr.readyState);
//         if (this.readyState == 4 && this.status == 200) {
//             var obj = JSON.parse(xhr.responseText); //返回值
//             console.log(obj);
//             //if (obj.data) {    
//             //  alert('上传成功');
//             //}
//         }
// }

}
const sliceFile = (file,size)=>{
  let result = []
  for(let i=0;i<file.size;i+=size){
    result.push(file.slice(i,i+size))
  }
  return result
}
const hash =(chunks)=>{
  console.log(chunks,'cc');
  return new Promise((resolve)=>{
    function read(index){
    if(index>chunks.length-1){
       let allHash = spark.end()
      console.log(allHash,'all');

      resolve({allHash,chunkList})
    }else{
      const blob = chunks[index]
      let fs = new FileReader()
      fs.onload = e=>{
        const bytes = e.target.result
        spark.append(bytes)
        console.log(bytes,'--');
        chunkList[index].hash = SparkMD5.ArrayBuffer.hash(bytes)
        read(index+1)
      }
      fs.readAsArrayBuffer(blob)
    }
  }
    const spark = new SparkMD5.ArrayBuffer()
    let allHash = ''
    const chunkList = chunks.map(item=>({
      blob:item,
      hash:''
    }))
    read(0)
  })
  
}
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="/api/upload"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
  ><el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
  <el-dialog
  v-model="dialogVisible"
  modal-class="img-preview"
  >
    <img class="img-wrapper" :src="imgsrc"/>
  </el-dialog>
  <!-- <el-button class="aa" @click="download">download</el-button> -->
  <el-divider/>
  <el-button type="primary" @click="search">search</el-button>
  <el-table :data="tableData" width="100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="fileName" label="fileName" />
    <el-table-column align="right" label="opration" width="200">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          @click="handleDownload(scope.row)"
        >
          Download
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :style="{marginTop:'10px'}"
      v-model:current-page="currentPage1"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50,100]"
      layout="total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  <el-divider/>
  <div>文件分片上传</div>
  <input type="file" id="upload">
</template>

<style>
.img-preview .img-wrapper{
  width:500px ;
  /* object-fit: cover; */
}
</style> 
<style lang='scss' scoped>
:global(.img-preview .img-wrapper){
  // width:200px
}
</style>