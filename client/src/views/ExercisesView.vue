<script setup lang="ts">
import ExerciseList from '@/components/ExerciseList.vue';
</script>

<template>
    <div>
        <div class="buttons">
            <button class="button is-primary">Add Exercise</button>
            <button class="button is-danger">Remove Exercise</button>
            <button class="button is-info">Edit Exercise</button>
        </div>
        <ExerciseList />
    </div>
</template>

<style scoped>

</style>