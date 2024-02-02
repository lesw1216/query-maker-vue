<template lang="">
    <div>
        <div class="m-2 d-flex flex-column">
            <SuccessAlrt :message="schemaQuery" :isSuccess="isSchemaQuery"></SuccessAlrt>
            <InputComp :input-label="'SchemaName'" :is-valid="isValidCheck(validErrorMessages.schemaName)" @request-button="createForm"></InputComp>
            <div class='alert alert-danger mt-2' v-if="isValidCheck(validErrorMessages.schemaName)">
                {{validErrorMessages.schemaName}}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive }  from "vue"
import { useClipboard } from '@vueuse/core'

import axios from '@/api/axios'

import SuccessAlrt from "@/components/SuccessAlrtComp.vue";
import Button from '@/components/ButtonComp.vue';
import InputComp from "@/components/InputComp.vue";

// ref
const schemaQuery = ref("")
const isSchemaQuery = ref(false)

// reactive
const validErrorMessages = reactive({
    schemaName:undefined
})

// function
const isValidCheck = (field) => {
    return field != undefined
}

const initCondition = () => {
    isSchemaQuery.value = false
    validErrorMessages.schemaName=undefined;
}

// vueUse
const {copy} = useClipboard({ schemaQuery })

const createForm = (schemaNameProps) => {
    initCondition()

    axios.post('/schemas', {
        schemaName: schemaNameProps
    })
    .then(function (response) {
        console.log(response.data);

        if(response.data['code'] == 200 && response.data['httpStatus'] == 'OK') {
            schemaQuery.value = response.data['data'];
            isSchemaQuery.value = true;
        }
    }).catch(function(error) {
        const responseData = error.response['data']['data'];
        const keys = Object.keys(validErrorMessages)
        
        // key is index
        for (const key in keys) {
            const keyName = keys[key]
            validErrorMessages[keyName]=responseData[keyName]
        }

        // validErrorMessages.schemaName=error.response['data']['data'][validErrorMessages.schemaName]
    });
}
</script>
<style lang="">
    
</style>