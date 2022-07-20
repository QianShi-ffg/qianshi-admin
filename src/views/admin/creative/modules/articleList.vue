<template>
  <div id="articleBtn">
    <el-button type="primary" @click="()=>{router.push({path:'/article'})}">新建</el-button>
    <el-button type="success">批量发布</el-button>
    <el-button type="danger">批量删除</el-button>
  </div>
  <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column property="title" label="标题" />
    <el-table-column property="status" label="发布状态" show-overflow-tooltip />
    <el-table-column label="创建时间">
      <template #default="scope">{{ scope.row.createDate }}</template>
    </el-table-column>
    <el-table-column label="更新时间">
      <template #default="scope">{{ scope.row.upateDate }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="success">发布</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script async setup>
import { ref } from 'vue'
import { ElTable, ElPagination } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '@/api/index.js'


const router = useRouter()
const multipleTableRef = ref()
const multipleSelection = ref([])

const res = await api.getArticleList()
console.log(res, 666666666666666666666)

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const tableData = [
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '未发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '未发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '未发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  },
  {
    title: 'aaaaaaaaaaaaa',
    status: '已发布',
    createDate: '2016-05-03',
    upateDate: '2016-05-03',
  }
]
</script>

<style lang='scss' scoped>
#articleBtn {
  margin-bottom: 20px;
}
</style>
