<template lang="">
    <div>
        <div class="m-2 d-flex flex-column">
            <SuccessAlrt :message="schemaQuery" :isSuccess="isSchemaQuery"></SuccessAlrt>
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                    <div class="align-self-end">
                        SchemaName:
                    </div>
                    <Button :button-name="'CREATE'" @click="createForm()" :button-type="'btn-primary'"></Button>
                </div>
                <input class="form-control" type="text" placeholder="schema name..." aria-label="create schema label" 
                    v-model="schemaName">
            </div>
            
        </div>
    </div>
</template>
<script setup>
import { ref }  from "vue"
import { useClipboard } from '@vueuse/core'

import axios from '@/api/axios'

import SuccessAlrt from "@/components/SuccessAlrtComp.vue";
import Button from '@/components/ButtonComp.vue';

// ref
const schemaName = ref("")
const schemaQuery = ref("")
const isSchemaQuery = ref(false)

// vueUse
const {copy} = useClipboard({ schemaQuery })

const createForm = () => {
    axios.post('/schemas', {
        schemaName: schemaName.value
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