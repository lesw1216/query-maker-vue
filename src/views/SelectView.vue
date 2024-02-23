<template lang="">
    <div>
        <div class="flex flex-col m-2">
            <InputComp class="mb-2" :input-label="'Table Name'" :is-valid="isValid(responseError.tableName)" @request-button="requestDefualtSelect"></InputComp>
            <SuccessAlrtComp :is-success="responseSuccess.isSuccess" :message="responseSuccess.createdQuery"></SuccessAlrtComp>
            <div class='valid-error' v-if="!isValid(responseError.tableName)">
                {{responseError.tableName}}
            </div>
            <div class="flex justify-between items-center mt-2">
                <div>
                    Columns
                </div>
                <div class="flex">
                    <CheckBoxComp class="me-2 self-center" :check-name="'ALL SELECT'" @click-check="onclickIsAllSelect"></CheckBoxComp>
                    <div class="flex" v-if="!isAllSelect">
                        <ButtonComp class="mr-2" :button-name="'Add'" :button-type="'btn-default'" @click="onclickIncreaseRow">
                        </ButtonComp>
                        <ButtonComp :button-name="'ALL DEL'" :button-type="'btn-default btn-delete'" @click="onclickAllDeleteColumnName">
                        </ButtonComp>
                    </div>
                    
                </div>
            </div>
            <div class='valid-error' v-if="isGlobalValid">
                Must Input ColumnName
            </div>
            <div class="grid grid-cols-3 text-center">
                <div>Column Name</div>
                <div>As Name</div>
                <div></div>
            </div>
            <div class="grid grid-cols-3 gap-2" v-for="(columnName, index ) in columnNames" v-if="!isAllSelect">
                <input type="text" class="border-2 focus:outline-none focus:border-blue-500 p-1" id="columnInput" v-model="columnName.name"
                    :class="[isValid(responseError['columnNames['+index+'].name']) ? '':'border-danger']">
                <input type="text" class="border-2 focus:outline-none focus:border-blue-500 p-1" id="asInput" v-model="columnName.asName">
                <ButtonComp class="" :button-name="'DEL'" :button-type="'btn-default btn-delete w-full'" 
                    @click="onclickDeleteColumnName(index)"></ButtonComp>
            </div>
            <!-- <div class="mt-2" v-for="(columnName, index) in columnNames" v-if="!isAllSelect">
                <div class="me-2 w-1/3 border">
                    <label for="columnInput" class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="columnInput" v-model="columnName.name"
                    :class="[isValid(responseError['columnNames['+index+'].name']) ? '':'border-danger']">
                </div>
                <div class="border">
                    <label for="asInput" class="form-label">As Name</label>
                    <input type="text" class="form-control" id="asInput" v-model="columnName.asName">
                </div>
                <ButtonComp class="align-self-end ms-2" :button-name="'DEL'" :button-type="'btn-danger'" 
                    @click="onclickDeleteColumnName(index)"></ButtonComp>
            </div> -->
        </div>
    </div>
</template>
<script setup>
import InputComp from '@/components/InputComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import CheckBoxComp from '@/components/CheckBoxComp.vue';
import SuccessAlrtComp from '@/components/SuccessAlrtComp.vue';

import axios from '@/api/axios';

import { ref, reactive, inject } from 'vue';

const { responseDataToField, isValid, objectInit } = inject("$globalMethods")

// ref
const columnNames = ref([{
    name:null,
    asName:null
}])

const isAllSelect = ref(false)
const isGlobalValid = ref(false)


// reactive
const responseSuccess = reactive({
    createdQuery:null,
    isSuccess:false
})

const responseError = reactive({

})

// axios
const requestDefualtSelect = (tableNameProps) => {
    initCondition()
    objectInit(responseError)
    checkAsNameEmpty()

    axios.post("/selects", {
        tableName: tableNameProps,
        columnNames: columnNames.value,
        allSelect: isAllSelect.value
    })
    .then(function(response) {
        const code = response.data['code']
        const httpStatus = response.data['httpStatus']

        if (code === 200 && httpStatus === "OK") {
            responseSuccess.createdQuery = response.data['data']
            responseSuccess.isSuccess = true;
        }
    })
    .catch(function(error) {
        const res = error.response
        const data = res['data']['data']

        responseDataToField(data, responseError) // 객체 초기화

        const size = Object.keys(data).length;  // 객체 사이즈 구하기
        if(size == 1 && responseError.tableName !== undefined) {
            return
        }

        isGlobalValid.value = true
    })
}

// function
const checkAsNameEmpty = () => {
    for(let i = 0; i < columnNames.value.length; i++) {
    
        console.log(columnNames.value[i].asName)
        if (columnNames.value[i].asName === '') {
            columnNames.value[i].asName = null;
        }
    }
}

const initCondition = () => {
    isGlobalValid.value = false
    responseSuccess.isSuccess = false
}

// onclick method
const onclickIncreaseRow = () => {
    columnNames.value.push({
        name:undefined,
        asName:undefined
    })
}

const onclickDeleteColumnName = (index) => {
    if (index == 0) {
        columnNames.value[0] = {
            name:null,
            asName:null
        }

        return;
    }
    console.log("onclickDeleteColumnName")
    columnNames.value.splice(index, 1)
}

const onclickAllDeleteColumnName = () => {
    initCondition()
    objectInit(responseError)

    columnNames.value.splice(1)
    columnNames.value[0].name = null
    columnNames.value[0].asName = null
}

const onclickIsAllSelect = (isCheck) => {
    console.log(isCheck)
    isAllSelect.value = !isCheck
    columnNames.value.splice(1)

    if (isAllSelect.value) {
        columnNames.value[0].name = "all"
        columnNames.value[0].asName = "all"
    } else {
        columnNames.value[0].name = null
        columnNames.value[0].asName = null
    }
}

</script>
<style lang="">
    
</style>