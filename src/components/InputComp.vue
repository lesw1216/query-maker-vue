<template lang="">
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-between mb-2">
            <div class="align-self-end">
                {{inputLabel}}:
            </div>
            <Button :button-name="'CREATE'" @click="$emit('requestButton', inputValue)" :button-type="'btn-primary'"></Button>
        </div>
        <input class="form-control" :class="[inputClass, isValid ? 'border-danger' : '']" type="text" aria-label="input label" 
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