<script setup lang="ts">
import exercises from '@/data/exercises.json';
</script>

<template>
    <div>
        <h2>Exercises</h2>
        <!-- Wrap exercises in a UL for proper list structure -->
        <ul>
            <li v-for="exercise in exercises" :key="exercise.id" class="exercise-item">
                <span>{{exercise.exercise}}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>