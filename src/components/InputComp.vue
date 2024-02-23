<template lang="">
    <div class="flex flex-col">
        <div class="flex justify-between mb-1">
            <div class="self-end">
                {{inputLabel}}:
            </div>
            <Button :button-name="'CREATE'" @click="$emit('requestButton', inputValue)" :button-type="'btn-default'"></Button>
        </div>
        <input class="border-2 rounded-md focus:outline-none p-2 focus:border-blue-300" :class="[inputClass, isValid ? '' : 'border-red-600']" type="text" aria-label="input label" 
                    v-model="inputValue">
    </div>
</template>
<script setup>
const props = defineProps({
    isValid: Boolean,
    inputClass: String,
    inputLabel: String
})

import { ref } from 'vue';

import Button from './ButtonComp.vue';
const inputValue = ref(undefined)


</script>
<style lang="">
    
</style>