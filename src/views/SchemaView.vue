<template lang="">
    <container>
        <div class="m-2 d-flex flex-column">
            <input class="form-control mb-2" type="text" placeholder="schema name..." aria-label="create schema label">
            <Button :button-name="'create'" @click="create()" :button-type="'btn-primary'"></Button>
        </div>
    </container>
    
</template>
<script setup>
import { ref }  from "vue"
import Button from '@/components/ButtonComp.vue';

const create = () => {
    console.log("생성 클릭")
}
</script>
<style lang="">
    
</style>