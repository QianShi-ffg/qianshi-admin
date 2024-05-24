<template>
  <header id="articleHeader">
    <el-button
      :icon="ArrowLeft"
      link
      @click="
        () => {
          router.push({ path: '/creative' });
        }
      "
      >返回</el-button
    >
    <el-input
      placeholder="请输入文章标题"
      class="articleTitle"
      v-model="titleValue"
    ></el-input>
    <div>
      <el-button @click="save" round>保存草稿</el-button>
      <el-button type="success" @click="publish" round :disabled="publishDisabled">发布</el-button>
    </div>
  </header>
  <div class="editor">
    <MdEditor
      v-model="text"
      @onHtmlChanged="saveHtml"
      @onSave="codeSave"
      :onUploadImg="uploadImg"
      :theme="theme"
      ref="editorRef"
    />
  </div>
  <saveDialogVue ref="saveDialog" @success="success" :artDesc="artDesc" />
</template>

<script setup>
import saveDialogVue from "./saveDialog.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";
import { MdEditor } from 'md-editor-v3';
import "md-editor-v3/lib/style.css";
import api from "@/api/index.js";

const router = useRouter();
const route = useRoute();
const text = ref("");
const titleValue = ref("");
const articleInfo = ref({});
const artDesc = ref({});
const saveDialog = ref(null);
const publishDisabled = ref(true)

// 编辑器配置
const editorRef = ref();

// 编辑器主题
const theme = ref("light");
const articleData = reactive({
  title: "",
  articleContent: "",
  articleStatus: 0,
});
const saveType = ref("save");
let saveIcon = null;

// 判断当前是编辑还是新建
if (route.query.id) {
  saveType.value = "edit";
  try {
    const res = await api.getArticleDetail({ id: route.query.id });
    console.log(res, 96666);
    if (res.code === 200) {
      console.log(res);
      titleValue.value = res.data.title;
      text.value = res.data.articleContent;
      artDesc.value = {
        classifyId: res.data.classifyId,
        coverUrl: res.data.coverUrl,
        describe: res.data.describe,
      };
    } else {
      throw res.message;
    }
  } catch (error) {
    console.log(error);
  } finally {
    // 预留loading处理
  }
  // text.value = sessionStorage.getItem('md')
}

const saveHtml = (e) => {
  console.log(e, 86666);
  // if (e.includes('<!---->')) {
  //   // console.log(e.split('!----')[0], 89999)
  //   articleHtmlContent.value = e.split('<!---->')[0]
  // } else {
  //   // console.log(e, 86666)
  //   articleHtmlContent.value = e
  // }
};

// 点击保存草稿
const save = () => {
  if (!titleValue.value) {
    ElMessage({ message: "请添加文章标题", type: "waring" });
    return;
  }
  saveDialog.value.show();
};

const success = (value) => {
  console.log(value, 223333);
  articleInfo.value = value;
  saveIcon[0].click();
};

onMounted(() => {
  const icon =
    document.getElementsByClassName("md-editor-toolbar-item").length === 0
      ? document.getElementsByClassName("md-toolbar-item")
      : document.getElementsByClassName("md-editor-toolbar-item");
  saveIcon = Array.from(icon).filter((item) => {
    return item.title === "保存";
  });
  saveIcon[0].style.display = "none";
});

// 点击编辑器内部保存 保存草稿
const codeSave = async (e) => {
  let params = {
    id: route.query.id || null,
    title: titleValue.value,
    articleContent: e,
    articleStatus: 0,
  };
  params = Object.assign(params, articleInfo.value);
  const res = route.query.id
    ? await api.articleUpdate(params)
    : await api.saveDraft(params);
  if (res.code === 200) {
    if (saveType.value === "save") {
      router.replace({ path: route.path, query: { id: res.data.id } });
      saveType.value = "edit";
    }
    publishDisabled.value = false
    ElMessage({ message: "已保存草稿箱", type: "success" });
  } else {
    ElMessage({ message: "系统错误请稍后再试", type: "error" });
  }
};

// 发布
const publish = async () => {
  if (saveType.value === "save") {
    ElMessage({ message: "当前文章未保存,请保存后再发布", type: "error" });
    return;
  }
  console.log(666);
  const res = await api.publish({ ids: [route.query.id] });
  if (res.code === 200) {
    ElMessage({ message: "发布成功", type: "success" });
    router.push({ path: "/creative" });
  } else {
    ElMessage({ message: "发布失败,请稍后再试", type: "error" });
  }
};

// 上传图片
const uploadImg = async (files, callback) => {
  const formData = new FormData();
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
    // fromData.append(files[i].name, files[i]);
  }
  const res = await api.uploadImg(formData);
  console.log(import.meta, import.meta.env, 555555555555555555);
  callback(
    res.data.map((item) => `${import.meta.env.VITE_BASEURL}${item.path}`)
  );
};
</script>

<style lang="scss" scoped>
.editor {
  height: calc(100vh - 60px);
  padding: 10px 20px;
}

#articleHeader {
  position: relative;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button.is-link {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.849);

    &:hover {
      color: rgb(255, 255, 255);
    }
  }

  :deep(.el-input) {
    width: 40%;

    .el-input__wrapper {
      border: 3px solid transparent;
      border-radius: 18px;
      background-image: linear-gradient(
          to right,
          var(--el-card-bgColor),
          var(--el-card-bgColor)
        ),
        linear-gradient(
          to right,
          var(--theme-right-color) 0%,
          var(--theme-left-color) 100%
        );
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      box-shadow: none;

      &.is-focus {
        border: 3px solid var(--theme-left-color);
        box-shadow: 0 0 13px 3px var(--theme-left-color);
      }
    }
  }
}
</style>
