<template>
  <div id="creative">
    <div>
      <el-button type="primary" @click="
        () => {
          router.push({ path: '/article' });
        }
      " round>新 建</el-button>
      <el-button type="success" @click="batchPublish" v-if="multipleSelectionId.length > 0" round>批量发布</el-button>
      <el-button type="danger" @click="batchDelete" v-if="multipleSelectionId.length > 0" round>批量删除</el-button>
    </div>
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
      size="default" height="calc(100% - 105px)">
      <el-table-column type="selection" width="55" />
      <el-table-column property="title" label="标题" />
      <el-table-column label="发布状态">
        <template #default="scope">
          <span :style="{
            background: scope.row.articleStatus === 0 ? '#f37227' : '#67c23a',
            color: '#fff',
            padding: '2px 10px',
            borderRadius: '10px',
          }">
            {{ scope.row.articleStatus === 0 ? "未发布" : "已发布" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">{{ date(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">{{ date(scope.row.updataTime) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
            <el-button @click="handleEdit(scope.$index, scope.row)" :icon="Edit" link></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="handleDelete([scope.row.id])" :icon="Delete" link></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="发布" placement="top" v-if="scope.row.articleStatus === 0">
            <el-button type="success" @click="publish([scope.row.id])" :icon="Promotion" link></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>

</template>

<script setup>
import { ref, reactive } from "vue";
import { ElTable, ElPagination, ElMessage } from "element-plus";
import { Delete, Edit, Promotion } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import date from "@/utils/date";
import api from "@/api/index.js";

const router = useRouter();
const route = useRoute();
const multipleTableRef = ref();
const multipleSelection = ref([]);
const multipleSelectionId = ref([]);
const tableData = ref([]);
const paginationObj = reactive({
  page: 1
})

const init = async () => {
  try {
    const res = await api.getArticleList();
    if (res.code === 200) {
      tableData.value = res.data;
    } else {
      throw res.msg;
    }
  } catch (error) {
    console.log(error);
  } finally {
    // 预留loading处理
  }
};
init();

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};
const handleSelectionChange = (val) => {
  console.log(val);
  multipleSelection.value = val;
  multipleSelectionId.value = val.map((item) => {
    return item.id;
  });
};

// 编辑
const handleEdit = (index, row) => {
  console.log(index, row.title);
  router.push({ path: "/article", query: { id: row.id } });
};

// 批量删除
const batchDelete = () => {
  handleDelete(multipleSelectionId.value);
};
// 单条删除
const handleDelete = async (ids) => {
  try {
    const res = await api.deleteArticle({ id: ids.join(",") });
    console.log(res, "resresres");
    if (res.code === 200) {
      init();
      ElMessage({ message: "删除成功", type: "success" });
    } else {
      throw res.msg;
    }
  } catch (error) {
    console.log(error);
    ElMessage({ message: error, type: "error" });
  } finally {
    // 预留loading处理
  }
};

// 批量发布
const batchPublish = () => {
  publish(multipleSelectionId.value);
};
// 发布
const publish = async (ids) => {
  console.log(666);
  const res = await api.publish({ id: ids.join(",") });
  if (res.code === 200) {
    init();
    ElMessage({ message: "发布成功", type: "success" });
  } else {
    ElMessage({ message: "发布失败,请稍后再试", type: "error" });
  }
};

</script>

<style lang="scss" scoped>
#creative {
  height: 100%;
}

.el-table {
  margin-top: 20px;
}

.el-pagination {
  position: absolute;
  bottom: 30px;
  right: 20%;
}
</style>
