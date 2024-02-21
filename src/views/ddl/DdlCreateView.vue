<template lang="">
    <div>
        <div class="flex">
            <router-link class="inline-block w-full p-2 hover:bg-indigo-800 hover:text-white rounded-md mb-2"
              to="/ddl/creation/schema">schema</router-link>
            <router-link class="inline-block w-full p-2 hover:bg-indigo-800 hover:text-white rounded-md mb-2"
              to="/ddl/creation/table">table</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>