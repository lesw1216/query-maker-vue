<template lang="">
    <div class="h-100">
        <div class="m-2">
            <div class="flex flex-col">
                <InputComp class="mb-2" :input-label="'Table Name'" :is-valid="isValid(responseError.tableName)" @request-button='createForm'></InputComp>
                <SuccessAlrtComp :message="responseSuccess.createdQuery" :isSuccess="responseSuccess.isSuccess"></SuccessAlrtComp>
                <div class='text-lg text-red-500' v-if="!isValid(responseError.tableName)">
                    {{responseError.tableName}}
                </div>
            </div>

            <div class="text-nowrap">
                <h2 class="text-xl">
                    OPTIONS
                </h2>
                <div class="grid gap-2 grid-cols-5 text-center">
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg">
                            primary key
                        </h3>
                        <input class="border-2 focus:outline-none focus:border-blue-500 p-1"/>
                    </div>
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg">
                            foreign key
                        </h3>
                        <input class="border-2 focus:outline-none focus:border-blue-500 p-1"/>
                    </div>
                    <div class="flex flex-col gap-1">
                        <h3 class="text-lg">
                            auto-increament
                        </h3>
                        <input class="border-2 focus:outline-none focus:border-blue-500 p-1"/>
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-col mb-2 mt-2">
                    <div class="flex justify-between">
                        <div class='self-end text-xl'>
                            Columns
                        </div>
                        <div class="flex">
                            <Button :button-name="'Add'" :button-type="'btn-default'" class="me-2" 
                                @click="onClickIncreaseRowCount"></Button>
                            <Button :button-name="'ALL DEL'" :button-type="'btn-default btn-delete'" @click="onclickAllDeleteColumn"></Button>
                        </div>
                    </div>
                    <div>
                        <div class='text-lg text-red-500' v-if="isGlobalValid">
                            Must Input Fields, And Correct Type.
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-5 text-lg text-center text-nowrap border-b-blue-500 border-b mb-2">
                    <div class=''>name</div>
                    <div class=''>type</div>
                    <div class=''>size</div>
                    <div class=''>not null</div>
                    <div class=''></div>
                </div>
                <div class="grid grid-cols-5 items-center gap-2" v-for="(column, index) in columns">
                    <div class="">
                        <input class="w-full border-2 focus:outline-none p-1 focus:border-blue-500" v-model="column.name" 
                        :class="[isValid(responseError['columns['+index+'].name']) ? '':'border-red-300']" />
                    </div>
                    <div class="">
                        <select aria-label="Default select example" v-model="column.type" class="p-1 border-2 w-full focus:outline-none focus:border-blue-500"
                                :class="[isValid(responseError['columns['+index+'].type']) ? '':'border-red-300']">
                                    <option disabled selected>SELECT TYPE</option>
                                    <option v-for="columnType in columnTypes">{{columnType}}</option>
                        </select>
                    </div>
                    <div class="">
                        <input v-model="column.size" class="border-2 p-1 w-full focus:outline-none focus:border-blue-500"
                                :class="[isValid(responseError['columns['+index+'].size']) ? '':'border-red-300']"/>
                    </div>
                    <div class="text-center">
                        <input class="mt-2 size-5" type="checkbox"
                                    v-model="column.notNull" />
                    </div>
                    <div class="">
                        <Button :button-name="'DELETE'" :button-type="'btn-default btn-delete w-full'" @click="onclickDeleteColumn(index)"></Button>
                    </div>
                </div>
            </div>
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