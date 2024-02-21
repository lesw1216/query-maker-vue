<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigatorComp from './components/NavigatorComp.vue';
</script>

<template>
  <div class="h-screen w-screen">
    <div class="flex h-full w-full">
      <nav class="bg-indigo-600 w-52 fixed h-full">
        <NavigatorComp></NavigatorComp>
      </nav>
      <div class="flex flex-col h-full w-[calc(100%-13rem)] absolute left-52">
        <header class="text-5xl mx-2 sticky top-0 bg-white">
          <h1>QUERY MAKER</h1>
        </header>
        <main class="m-2 h-full top-16">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
