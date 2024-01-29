<template lang="">
    <div>
        <button type="button" class="btn" :class="[buttonType]">{{ buttonName }}</button>
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