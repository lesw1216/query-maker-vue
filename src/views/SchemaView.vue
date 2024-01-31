<template lang="">
    <div>
        <div class="m-2 d-flex flex-column">
            <SuccessAlrt :message="schemaQuery" :isSuccess="isSchemaQuery"></SuccessAlrt>
            <InputComp :input-label="'SchemaName'" @request-button="createForm"></InputComp>
        </div>
    </div>
</template>
<script setup>
import { ref }  from "vue"
import { useClipboard } from '@vueuse/core'

import axios from '@/api/axios'

import SuccessAlrt from "@/components/SuccessAlrtComp.vue";
import Button from '@/components/ButtonComp.vue';
import InputComp from "@/components/InputComp.vue";

// ref
const schemaQuery = ref("")
const isSchemaQuery = ref(false)

// vueUse
const {copy} = useClipboard({ schemaQuery })

const createForm = (schemaNameProps) => {
    axios.post('/schemas', {
        schemaName: schemaNameProps
    })
    .then(function (response) {
        console.log(response.data);

        if(response.data['code'] == 200 && response.data['httpStatus'] == 'OK') {
            schemaQuery.value = response.data['data'];
            isSchemaQuery.value = true;
        }
    });
}
</script>
<style lang="">
    
</style>