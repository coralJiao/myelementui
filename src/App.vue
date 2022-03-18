<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    editor:{{ editor }}
    <TipTapCommom v-model="editor" />
<!-- <el-divider></el-divider>
    <TipTapCommom v-model="editor1" />
<el-divider></el-divider>
    <TipTapCommom v-model="editor2" />
<el-divider></el-divider>
    <TipTapCommom v-model="editor3" /> -->

  </div>
</template>

<script>
import TipTapCommom from './components/TipTapCommom'
export default {
  name: 'App',
  components: {
    TipTapCommom
  },
  data () {
    return {
      editor: '123456',
      editor1: '123456',
      editor2: '123456',
      editor3: '123456'
    }
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
