<template lang="">
    <div class="h-100">
        <div class="d-flex flex-column m-2">
            <InputComp class="mb-2" :input-label="'Table Name'" :is-valid="isValid(responseError.tableName)" @request-button='createForm'></InputComp>
            <SuccessAlrtComp :message="responseSuccess.createdQuery" :isSuccess="responseSuccess.isSuccess"></SuccessAlrtComp>
            <div class='alert alert-danger mt-2' v-if="!isValid(responseError.tableName)">
                {{responseError.tableName}}
            </div>
            <div class="d-flex justify-content-between flex-column">
                <div class="d-flex justify-content-between">
                    <div class='align-self-center'>
                        Columns
                    </div>
                    <div class="d-flex">
                        <Button  :button-name="'Add'" class="me-2" :button-type="'btn-secondary'"
                            @click="onClickIncreaseRowCount"></Button>
                        <Button :button-name="'ALL DEL'" :button-type="'btn-danger'" @click="onclickAllDeleteColumn"></Button>
                    </div>
                </div>
                <div>
                    <div class='alert alert-danger mt-2' v-if="isGlobalValid">
                        Must Input Fields, And Correct Type.
                    </div>
                </div>
            </div>
            
            <table class="table table-hover">
                <thead class="text-center">
                    <tr>
                        <th class="w-10" scope="col">name</th>
                        <th scope="col">type</th>
                        <th scope="col">size</th>
                        <th scope="col">primary key</th>
                        <th scope="col">not null</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(column, index) in columns">
                        <td >
                            <input class="form-control" v-model="column.name" 
                            :class="[isValid(responseError['columns['+index+'].name']) ? '':'border-danger']" />
                        </td>
                        <td>        
                            <select class="form-select" aria-label="Default select example" v-model="column.type" 
                            :class="[isValid(responseError['columns['+index+'].type']) ? '':'border-danger']">
                                <option disabled selected>SELECT TYPE</option>
                                <option v-for="columnType in columnTypes">{{columnType}}</option>
                            </select>
                        </td>
                        <td >        
                            <input class="form-control" v-model="column.size"
                            :class="[isValid(responseError['columns['+index+'].size']) ? '':'border-danger']"/>
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
            
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from 'vue';

import axios from '@/api/axios';

import Button from '@/components/ButtonComp.vue'
import SuccessAlrtComp from '@/components/SuccessAlrtComp.vue';
import InputComp from '@/components/InputComp.vue';

const { isValid, responseDataToField, objectInit} = inject('$globalMethods')

// class
class Column {
    constructor(name, type, size, primaryKey, notNull) {
        this.name = name,
        this.type = type,
        this.size = size,
        this.primaryKey = primaryKey,
        this.notNull = notNull;
    }
}

// ref
const columnTypes = ref([])
const columns = ref([new Column(null, null, null, false, false)])
const isGlobalValid = ref(false)

// reactive
const responseSuccess = reactive({
    isSuccess: false,
    createdQuery:null
})

const responseError = reactive({
   
})

// function

const createForm = (tableNameProps) => {
    objectInit(responseError)
    objectInit(responseSuccess)
    isGlobalValid.value = false

    axios.post("/tables", {
        tableName: tableNameProps,
        columns: columns.value
    }).then(function(response) {
        const code = response.data['code']
        const httpStatus = response.data['httpStatus']

        if (code === 200 && httpStatus === 'OK') {
            responseSuccess.createdQuery=response.data['data']
            responseSuccess.isSuccess=true;
        }

    }).catch(function(error) {
        const res = error.response
        const data = res['data']['data']

        responseDataToField(data, responseError)
        console.log(data)

        const size = Object.keys(data).length
        if(size == 1 && responseError.tableName !== undefined) {
            return
        }

        isGlobalValid.value = true
    })
}


// onClick

const onClickIncreaseRowCount = () => {
    columns.value.push(new Column(null, null, null, false, false))
}

const onclickDeleteColumn = (index) => {
    if (index == 0) {
        columns.value[0] = new Column(null,null,null, false, false)

        return;
    }

    columns.value.splice(index, 1)
}

const onclickAllDeleteColumn = () => {
    columns.value.splice(1)
    columns.value[0] = new Column(null,null,null, false, false)
    objectInit(responseError)
    isGlobalValid.value = false

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