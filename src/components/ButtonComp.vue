<template lang="">
    <div>
        <!-- <button type="button" class="border-2 p-2 rounded-md" :class="[buttonType]">{{ buttonName }}</button> -->
        <button type="button" class="border-blue-100 border-2 p-2 rounded-md" :class="[buttonType]">{{ buttonName }}</button>

    </div>
</template>
<script setup>
const props = defineProps({
    buttonName: String,
    buttonType: String
})

</script>
<style lang="">
    
</style>