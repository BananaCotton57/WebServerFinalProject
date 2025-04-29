<script setup lang="ts">
import { ref, onMounted } from 'vue';
import users from '@/data/users.json';
import { loadUsers, usersRef, type User } from '@/models/users';

const isLoading = ref(true);
const error = ref<string | null>(null);

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
    <h2>Users</h2>
    <!-- Wrap users in a UL for proper list structure -->
    <ul>
      <li v-for="user in usersRef" :key="user.username" class="user-item">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <div class="user-info">
          <span><strong>{{ user.name }}</strong></span>
          <span>Username: {{ user.username }}</span>
          <span v-if="user.is_administrator" class="admin-tag">Administrator</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Style the list and make it look better */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

li:hover {
  background-color: #f5f5f5;
}

.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.admin-tag {
  color: red;
  font-weight: bold;
  margin-top: 5px;
}
</style>

