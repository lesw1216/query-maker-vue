<template lang="">
    <div>
        <div class="d-flex flex-column m-2">
            <InputComp class="mb-2" :input-label="'Table Name'" @request-button="requestDefualtSelect"></InputComp>
            <hr class="border-4">
            <div class="d-flex justify-content-between">
                <div>
                    Columns
                </div>
                <div class="d-flex">
                    <CheckBoxComp class="me-2 align-self-center" :check-name="'ALL SELECT'" @click-check="onclickIsAllSelect"></CheckBoxComp>
                    <div class="d-flex" v-if="!isAllSelect">
                        <ButtonComp class="me-2" :button-name="'Add'" :button-type="'btn-secondary'" @click="onclickIncreaseRow">
                        </ButtonComp>
                        <ButtonComp :button-name="'ALL DEL'" :button-type="'btn-danger'" @click="onclickAllDeleteColumnName">
                        </ButtonComp>
                    </div>
                    
                </div>
            </div>
            <div class="d-flex justify-content-between mt-2" v-for="(columnName, index) in columnNames" v-if="!isAllSelect">
                <div class="d-flex flex-column me-2 flex-grow-1">
                    <label for="columnInput" class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="columnInput" v-model="columnName.name">
                </div>
                <div class="d-flex flex-column flex-grow-1">
                    <label for="asInput" class="form-label">As Name</label>
                    <input type="text" class="form-control" id="asInput" v-model="columnName.asName">
                </div>
                <ButtonComp class="align-self-end ms-2" :button-name="'DEL'" :button-type="'btn-danger'" 
                    @click="onclickDeleteColumnName(index)"></ButtonComp>
            </div>
        </div>
    </div>
</template>
<script setup>
import InputComp from '@/components/InputComp.vue';
import ButtonComp from '@/components/ButtonComp.vue';
import CheckBoxComp from '@/components/CheckBoxComp.vue';

import axios from '@/api/axios';

import { ref } from 'vue';

const columnNames = ref([{
    name:null,
    asName:null
}])

const isAllSelect = ref(false)

const requestDefualtSelect = (tableNameProps) => {
    axios.post("/selects", {
        tableName: tableNameProps,
        columnNames: columnNames.value,
        allSelect: isAllSelect.value
    }).then(function(response) {
        console.log(response.data['data'])
    })
}

// onclick method
const onclickIncreaseRow = () => {
    columnNames.value.push({
        name:undefined,
        asName:undefined
    })
}

const onclickDeleteColumnName = (index) => {
    console.log("onclickDeleteColumnName")
    columnNames.value.splice(index, 1)
}

const onclickAllDeleteColumnName = () => {
    columnNames.value.splice(0)
}

const onclickIsAllSelect = (isCheck) => {
    console.log(isCheck)
    isAllSelect.value = !isCheck
}

</script>
<style lang="">
    
</style>