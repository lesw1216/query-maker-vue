<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigatorComp from './components/NavigatorComp.vue';
</script>

<template>
  <div>
    <header>
      <h1>Query Maker</h1>
    </header>
    <nav>
      <NavigatorComp></NavigatorComp>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

</style>
