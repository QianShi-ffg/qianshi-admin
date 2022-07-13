<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-12 w-12" src="../assets/logo.png" alt="ChitChat Logo" />
            </div>
            <div>
              <div class="text-xl font-medium text-black">ChitChat</div>
              <p class="text-gray-500">You have a new message!</p>
            </div>
          </div>
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    // 封装位置函数
    function usePosition(state, x, y) {
      const position = reactive({
        x: 0,
        y: 0,
      });
      // 绑定鼠标移动事件
      const onMouseMove = (event) => {
        position.x = event.x;
        position.y = event.y;
      };
      window.addEventListener("mousemove", onMouseMove);

      // 返回出去
      return toRefs(position);
    }

    // 接受 x, y 位置
    const { x, y } = usePosition();
    return {
      x,
      y,
    };
  },
};
</script>
