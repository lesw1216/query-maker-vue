<template lang="">
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="isCheck" @click="$emit('clickCheck', isCheck)" v-model="isCheck">
        <label class="form-check-label" for="isCheck">
            {{checkName}}
        </label>
    </div>
</template>
<script setup>
const props = defineProps({
    checkName: String
})

import { ref } from 'vue';

const isCheck = ref(false)

</script>
<style lang="">
    
</style>