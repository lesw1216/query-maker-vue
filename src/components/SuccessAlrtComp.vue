<template lang="">
    <div class="alert alert-secondary mb-2 d-flex" v-if="isSuccess">
                <div class="w-100 align-self-center">
                    {{message}}
                </div>
                <Button class="flex-shrink-1" :button-type="'btn-outline-secondary btn-sm'" :button-name="'copy'"
                        @click="copy(message)"></Button>
    </div>
</template>
<script setup>
const props = defineProps({
    isSuccess: Boolean,
    message: String
})

import { useClipboard } from '@vueuse/core'
import { ref } from 'vue';

import Button from './ButtonComp.vue';

const queryMessage=ref(props.message)
const {copy} = useClipboard({ queryMessage })
</script>
<style lang="">
    
</style>