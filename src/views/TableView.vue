<template lang="">
    <div class="h-100">
        <div class="d-flex flex-column m-2">
            <SuccessAlrtComp :message="tableCreateQuery.qeuryValue" :isSuccess="tableCreateQuery.isSuccess"></SuccessAlrtComp>
            <InputComp class="mb-2" :input-label="'Table Name'" @request-button='onclickCreateColumn'></InputComp>
            <table class="table table-hover">
                <thead class="text-center sticky-top">
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">type</th>
                        <th scope="col">size</th>
                        <th scope="col">primary key</th>
                        <th scope="col">not null</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(column, index) in columns">
                        <td>
                            <input class="form-control" v-model="column.name" />
                        </td>
                        <td>        
                            <select class="form-select" aria-label="Default select example" v-model="column.type">
                                <option disabled value="">SELECT TYPE</option>
                                <option v-for="columnType in columnTypes">{{columnType}}</option>
                            </select>
                        </td>
                        <td>        
                            <input class="form-control" v-model="column.size"/>
                        </td>
                        <td class="position-relative">
                            <input class="form-check-input position-absolute top-50 start-50 translate-middle" type="checkbox" 
                                v-model="column.primaryKey"/>
                        </td>
                        <td class="position-relative">
                            <input class="form-check-input position-absolute top-50 start-50 translate-middle" type="checkbox"
                                v-model="column.notNull" />
                        </td>
                        <td>
                            <Button :button-name="'DEL'" :button-type="'btn-danger'" @click="onclickDeleteColumn(index)"></Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button :button-name="'Add'" class="d-grid gap-2" :button-type="'btn-outline-secondary'"
                    @click="increaseRowCount"></Button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';

import axios from '@/api/axios';

import Button from '@/components/ButtonComp.vue'
import SuccessAlrtComp from '@/components/SuccessAlrtComp.vue';
import InputComp from '@/components/InputComp.vue';

// ref
const columnTypes = ref([])
const tableName = ref("")
const columns = ref([
    {
        name: '',
        type: '',
        size: null,
        primaryKey: false,
        notNull: false
    }
])

// reactive
const tableCreateQuery = reactive({
    isSuccess: false,
    qeuryValue:undefined
})


// function
const increaseRowCount = () => {
    columns.value.push({
        name: '',
        type: '',
        size: null,
        primaryKey: false,
        notNull: false
    })
}

const onclickCreateColumn = (tableNameProps) => {
    axios.post("/tables", {
        tableName: tableNameProps,
        columns: columns.value
    }).then(function(response) {
        console.log(response.data['data'])

        if (response.data['code'] == 200 && response.data['httpStatus'] == 'OK') {
            tableCreateQuery.qeuryValue=response.data['data']
            tableCreateQuery.isSuccess=true;
        }  
    })
}

const onclickDeleteColumn = (index) => {
    columns.value.splice(index, 1)
}

onMounted(() => {
    axios.get("/tables")
        .then(function (response) {
            columnTypes.value = response.data['data'];
        })
});
</script>
<style lang="">
    
</style>