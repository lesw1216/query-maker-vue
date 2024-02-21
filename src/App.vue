<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigatorComp from './components/NavigatorComp.vue';
</script>

<template>
  <div>
    <div class="flex h-screen">
      <nav class="p-4 bg-indigo-600 w-56">
        <NavigatorComp></NavigatorComp>
      </nav>
      <div class="border grow">
        <header>
          <h1>Query Maker</h1>
        </header>
        <main>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
