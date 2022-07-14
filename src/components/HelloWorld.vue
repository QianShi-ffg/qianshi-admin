<script setup>
import { useUserStore } from '../store/index' 
import { storeToRefs } from 'pinia'
defineProps({
  msg: String
})
const userStore = useUserStore()
const { count } = storeToRefs(userStore)
const setCount = () =>{
  let a = count.value
  userStore.setCount(++a);
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p>
      <button type="button" @click="setCount">count is {{ count }}</button>
    </p>
    <p>
      getCount is {{ userStore.getCount }}
    </p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
