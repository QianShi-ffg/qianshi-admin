<template>
  <div id="classifySetting">
    <div>
      <el-button type="primary" @click="addClass" round>新 建</el-button>
      <el-button type="danger" @click="batchDelete" v-if="multipleSelectionId.length > 0" round>批量删除</el-button>
    </div>
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
      size="default" height="calc(100% - 135px)" tooltip-effect>
      <el-table-column type="selection" width="55" />
      <!-- <el-table-column property="id" label="ID" /> -->
      <el-table-column property="name" label="作者名称" width="155"/>
      <el-table-column property="icon" label="头像链接">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.icon"
              placement="top-start"
            >
              <span style="white-space:nowrap;text-overflow: ellipsis; overflow: hidden; word-break: break-all;">{{ scope.row.icon }}</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="blogUrl" label="博客链接"/>
      <el-table-column property="desc" label="描述"/>
      <el-table-column label="创建时间">
        <template #default="scope">{{ date(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
            <el-button @click="handleEdit(scope.$index, scope.row)" :icon="Edit" link></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="handleDelete([scope.row.id])" :icon="Delete" link></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, prev, pager, next" :total="total" :page-size="20"
      @current-change="currentChange" :current-page="paginationObj.page"></el-pagination>
    <friendShipDialog :friendShipDesc="friendShipDesc" ref="friendDialog" @success="success"/>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { ElTable, ElPagination, ElMessage } from "element-plus";
import { Delete, Edit, Promotion } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import date from "@/utils/date";
import api from "@/api/index.js";
import friendShipDialog from "./friendShipDialog.vue";

const router = useRouter();
const route = useRoute();
const multipleTableRef = ref();
const multipleSelection = ref([]);
const multipleSelectionId = ref([]);
const tableData = ref([]);
const friendShipDesc = ref({})
const friendDialog = ref()
const paginationObj = reactive({
  page: 1,
  pageSize: 20
})
const total = ref(0)

const init = async () => {
  try {
    const res = await api.getFriendShipList(paginationObj)
    if (res.code === 200) {
      tableData.value = res.data
      total.value = res.total
    } else {
      throw res.msg
    }
  } catch (error) {
    console.log(error)
  } finally {
    // 预留loading处理
  }
}
init()

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
};
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  multipleSelectionId.value = val.map((item) => {
    return item.id
  })
}

// 编辑
const handleEdit = (index, row) => {
  console.log(index, row)
  friendShipDesc.value = {
    ...row
  }
  nextTick(()=> {
    friendDialog.value.show('edit')
  })
};

// 批量删除
const batchDelete = () => {
  handleDelete(multipleSelectionId.value)
}
// 单条删除
const handleDelete = async (ids) => {
  try {
    const res = await api.deleteFriendShip({ ids: ids.join(",") })
    if (res.code === 200) {
      init();
      ElMessage({ message: "删除成功", type: "success" })
    } else {
      throw res.msg
    }
  } catch (error) {
    console.log(error)
    ElMessage({ message: error, type: "error" })
  } finally {
    // 预留loading处理
  }
}

const addClass = () => {
  friendDialog.value.show('')
}

const success = () => {
  init()
}

const currentChange = (value) => {
  console.log(value)
  paginationObj.page = value
  init()
}

</script>

<style lang="scss" scoped>
#classifySetting {
  height: 100%;
}

.el-table {
  margin-top: 20px;
}

.el-pagination {
  position: absolute;
  bottom: 5px;
  right: 20%;
}
</style>
