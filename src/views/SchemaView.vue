<template lang="">
    <div>
        <div class="m-2 d-flex flex-column">
            <InputComp class='mb-2' :input-label="'SchemaName'" :is-valid="isValid(responseError.schemaName)" @request-button="createForm"></InputComp>
            <SuccessAlrt :message="responseSuccess.createdQuery" :isSuccess="responseSuccess.isSuccess"></SuccessAlrt>
            <div class='alert alert-danger' v-if="!isValid(responseError.schemaName)">
                {{responseError.schemaName}}
            </div>
        </div>
    </div>
</template>
<script setup>
// vue
import { ref, reactive, inject }  from "vue"

import axios from '@/api/axios'

// components
import SuccessAlrt from "@/components/SuccessAlrtComp.vue";
import Button from '@/components/ButtonComp.vue';
import InputComp from "@/components/InputComp.vue";

// global
const { isValid, responseDataToField, objectInit } = inject('$globalMethods')

// ref

// reactive
const responseSuccess = reactive({
    createdQuery:null,
    isSuccess:false
})

const responseError = reactive({
})


// function

const createForm = (schemaNameProps) => {
    objectInit(responseError)
    objectInit(responseSuccess)

    axios.post('/schemas', {
        schemaName: schemaNameProps
    })
    .then(function (response) {
        console.log(response.data);

        if(response.data['code'] == 200 && response.data['httpStatus'] == 'OK') {
            responseSuccess.createdQuery = response.data['data'];
            responseSuccess.isSuccess = true;
        }
    }).catch(function(error) {
        responseDataToField(error.response['data']['data'], responseError)
    });
}
</script>
<style lang="">
    
</style>