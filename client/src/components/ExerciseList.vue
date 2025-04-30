<script setup lang="ts">
//import exercises from '@/data/exercises.json';
import { ref, onMounted } from 'vue';
import { loadExercises, exercisesRef, remove, type Exercise } from '@/models/exercises';

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

// Add a function to handle post removal
const handleRemove = async (exercise: Exercise) => {
  try {
    // First remove from local array for immediate UI update
    const index = exercisesRef.value.findIndex(p => p.id === exercise.id);
    if (index !== -1) {
      exercisesRef.value.splice(index, 1);
    }
    
    // Then call the API to remove the post on the server
    await remove(exercise.id);
  } catch (err) {
    console.error("Error removing post:", err);
    error.value = "Failed to remove post";
    
    // If API call fails, add the post back to the array
    loadExercises(); // Reload posts from server to restore state
  }
};
</script>

<template>
    <div>
        <h2>Exercises</h2>
        <!-- Wrap exercises in a UL for proper list structure -->
        <ul>
            <li v-for="x in exercisesRef" :key="x.id" class="exercise-item">
                <span>{{x.exercise}}</span>
                  <button class="button is-danger" @click="handleRemove(x)">Remove Exercise</button>
                  <button class="button is-info">Edit Exercise</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>