<template lang="">
    <div>
        <div class="flex bg-white text-3xl fixed top-14 w-full">
            <router-link class="hover:border-b-4 hover:border-b-indigo-800 mr-10" 
                :class="{'border-b-indigo-800 border-b-4': isPath('/ddl/creation/schema')}"
                to="/ddl/creation/schema">schema</router-link>
            <router-link class="hover:border-b-4 hover:border-b-indigo-800"
                :class="{'border-b-indigo-800 border-b-4': isPath('/ddl/creation/table')}"
                to="/ddl/creation/table">table</router-link>
        </div>
        <div class="mt-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const router = useRouter()

const routePath = ref("")

const isDdlOver = ref(false)

router.afterEach(() => {
  routePath.value = route.path
})

const isPath = (path) => {
  const currentPath = routePath.value;
  return currentPath.includes(path)
}
</script>
<style lang="">
    
</style>