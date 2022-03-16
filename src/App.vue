<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    editor:{{ editor }}
    <TipTapCommom v-model="editor" />

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
      editor: '123456'
    }
  },
methods: {
}

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
