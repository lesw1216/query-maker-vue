<template lang="">
    <div>
        <div class="m-2 d-flex flex-column">
            <div class="form-control mb-2 d-flex" v-if="isSchemaQuery">
                <div class="w-100 align-self-center">
                    {{schemaQuery}}
                </div>
                <Button class="flex-shrink-1" :button-type="'btn-outline-secondary btn-sm'" :button-name="'copy'"></Button>
            </div>
            <input class="form-control mb-2" type="text" placeholder="schema name..." aria-label="create schema label" 
                v-model="schemaName">
            <Button :button-name="'create'" @click="createForm()" :button-type="'btn-primary'"></Button>
        </div>
    </div>
</template>
<script setup>
import { ref }  from "vue"
import Button from '@/components/ButtonComp.vue';
import axios from '@/api/axios'

const schemaName = ref("")
const schemaQuery = ref("")
const isSchemaQuery = ref(false)

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
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    });
}
</script>
<style lang="">
    
</style>