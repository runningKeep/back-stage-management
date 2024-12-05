<script setup>
import axios from 'axios'
import { nextTick, reactive, ref } from "vue";
let tableData = ref([])
const search = ()=>{
  axios.get('/api/users/list').then(res=>{
    console.log(res,'res');
    tableData.value = res.data
  })
}
search()
const handleEdit = (row)=>{
  dialogVisible.value = true
  currentUser.value = row
  ifEdit.value = true
  nextTick(()=>{
    for(let key in form){
    form[key] = row[key]
  }
  })
  
}
const handleDelete = (row)=>{
  axios.post('/api/users/delete',{id:row.iduser}).then(()=>{
    search()
  })
}

let dialogVisible = ref(false)
let ifEdit = ref(false)
let currentUser = ref({})
const openDialog = ()=>{
  dialogVisible.value = true
}
const handleClose = ()=>{
  console.log('ff');
  formRef.value.resetFields()
}
const confirm = ()=>{
  let params = form
  if(ifEdit.value){
    axios.post('/api/users/update',{...params,id:currentUser.value.iduser}).then(()=>{
      dialogVisible.value = false
      search()
    })
  }else{
    axios.post('/api/users/add',params).then(res=>{
      dialogVisible.value = false
      search()
    })
  }
}
const form = reactive({
  name:'',
  height:'',
  gender:'',
  age:'',
  college:'',
})
const formRef = ref()
</script>
<template>
    <h1>This is an users page</h1>
  <el-button @click="search">search</el-button>
  <el-button @click="openDialog">addNew</el-button>
  <el-table :data="tableData" width="100%">
    <el-table-column prop="name" label="name" width="180" />
    <el-table-column prop="height" label="height" />
    <el-table-column prop="gender" label="gender" />
    <el-table-column prop="age" label="age" />
    <el-table-column prop="college" label="college" />
    <el-table-column align="right" width="150">
      <template #default="scope">
        <el-button size="small" @click="handleEdit( scope.row)">
          Edit
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
  <el-dialog
    v-model="dialogVisible"
    title="Add"
    width="500"
    @closed="handleClose"
  >
  <el-form
    label-width="auto"
    :model="form"
    ref="formRef"
    style="max-width: 600px"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-input v-model="form.gender" />
    </el-form-item>
    <el-form-item label="Height" prop="height">
      <el-input v-model="form.height" />
    </el-form-item>
    <el-form-item label="College" prop="college">
      <el-input v-model="form.college" />
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
@media (min-width: 1024px) {
}
</style>
