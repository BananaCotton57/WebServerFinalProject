<script setup lang="ts">
//import exercises from '@/data/exercises.json';
import { ref, onMounted } from 'vue';
import { loadExercises, exercisesRef, type Exercise } from '@/models/exercises';

const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => { //im copying all of the isLoading and error a lot. I should probably make a function for this
  try {
    isLoading.value = true;
    await loadExercises();
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = "Failed to load exercises";
    console.error("Error loading exercises:", err);
  }
});
</script>

<template>
    <div>
        <h2>Exercises</h2>
        <!-- Wrap exercises in a UL for proper list structure -->
        <ul>
            <li v-for="x in exercisesRef" :key="x.id" class="exercise-item">
                <span>{{x.exercise}}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>