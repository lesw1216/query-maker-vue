<template>
    <div class="h-full text-xl text-slate-300 font-bold">
      <ul class="h-full">
        <li class="mb-2 flex flex-col">
          <div class="text-white text-2xl">
            DDL
          </div>
          <div class="indent-2 flex flex-col mt-2">
            <router-link class="inline-block w-full p-2 hover:bg-indigo-800 hover:text-white rounded-md mb-2" :class="{'bg-indigo-800 text-white visible': isPath('/ddl/creation')}"
              to="/ddl/creation">create</router-link>
            <!-- <router-link class="inline-block w-full p-2 hover:bg-indigo-800 hover:text-white rounded-md mb-2" :class="{'bg-indigo-800 text-white visible': isPath('/schema')}"
              to="/schema">create schema</router-link>
            <router-link class="inline-block w-full p-2 hover:bg-indigo-800 hover:text-white rounded-md" :class="{'bg-indigo-800 text-white': isPath('/table')}"
              to="/table">table create</router-link> -->
          </div>
        </li>
        <li class="mb-2 flex flex-col">
          <div class="text-white text-2xl">
            DML
          </div>
          <div class="indent-2 flex flex-col mt-2">
            <router-link class="inline-block w-full hover:bg-indigo-800 hover:text-white rounded-md p-2" :class="{'bg-indigo-800 text-white': isPath('/dml/selection')}"
           to="/dml/selection">select</router-link>
          </div>
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

const isDdlOver = ref(false)

router.afterEach(() => {
  routePath.value = route.path
})

const isPath = (path) => {
  return routePath.value == path
}

// events
const handleDetailOver = () => {
  isDdlOver.value = !isDdlOver.value;
  console.log(isDdlOver.value)
}
</script>
<style lang="">
</style>