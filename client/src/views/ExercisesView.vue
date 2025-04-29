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
    
    <div>
      <h1 class="title">Users</h1>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="has-text-centered">
        <p>Loading users...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="notification is-danger">
        {{ error }}
      </div>
      
      <!-- Users list -->
      <div v-else-if="usersRef.length > 0">
        <div v-for="user in usersRef" :key="user.id" class="box mb-3">
          <div class="columns is-vcentered">
            <div class="column is-narrow">
              <figure class="image is-48x48">
                <img :src="user.avatar" :alt="`${user.name}'s avatar`" class="is-rounded">
              </figure>
            </div>
            <div class="column">
              <p class="is-size-5">
                <strong>{{ user.name }}</strong> <span class="has-text-grey">@{{ user.username }}</span>
              </p>
              <p v-if="user.isAdministrator" class="tag is-info">Admin</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No users case -->
      <div v-else class="notification is-warning">
        No users found.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>