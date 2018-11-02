<template>
  <div id="app">
    <div class="container">
      <app-header style="margin-bottom: 20px;"></app-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
  export default {
    components: {
      'app-header': Header,
    },
  }
</script>

<style>
html,body,#app,.container{
  height: 100%;
}
</style>

