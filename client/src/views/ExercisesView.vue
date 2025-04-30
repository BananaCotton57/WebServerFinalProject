<script setup lang="ts">
import ExerciseList from '@/components/ExerciseList.vue';
import { loadUsers, usersRef, type User } from '@/models/users';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const error = ref<string | null>(null);

// Use the onMounted hook to load users when the component mounts

onMounted(async () => {
  try {
    isLoading.value = true;
    await loadUsers();
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = "Failed to load users";
    console.error("Error loading users:", err);
  }
});

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
/* Your styles here */
</style>