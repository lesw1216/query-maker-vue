<template>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link class="nav-link" :class="{active: isPath('/schema')}" to="/schema">create schema</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{active: isPath('/table')}" to="/table">table create</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :class="{active: isPath('/select')}" to="/select">select</router-link>
        </li>
      </ul>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const router = useRouter()

const routePath = ref()

router.afterEach(() => {
  routePath.value = route.path
})

const isPath = (path) => {
  return routePath.value == path
}
</script>
<style lang="">
</style>