<template lang="">
    <div class="flex bg-green-200 p-2 items-center justify-between rounded-md" v-if="isSuccess">
        <div class="" id="queryResult">
            {{message}}
        </div>
                <!-- <Button class="flex-shrink-1" :button-type="'btn-outline-secondary btn-sm'" :button-name="'copy'"
                        @click="copy(message)"></Button> -->
        <Button :button-type="'btn-default'" :button-name="'copy'"
            @click="copyQuery"></Button>
    </div>
</template>
<script setup>
const props = defineProps({
    isSuccess: Boolean,
    message: String
})

import { ref } from 'vue';

import Button from './ButtonComp.vue';

const queryMessage=ref(props.message)

// function
const copyQuery = () => {
    console.log("copyQuery")
    const copyQueryText = document.getElementById("queryResult").innerHTML;
    navigator.clipboard.writeText(copyQueryText)
}
</script>
<style lang="">
    
</style>