<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { loadUsers, usersRef, remove, type User } from '@/models/users';

const isLoading = ref(true);
const error = ref<string | null>(null);

// Autocomplete state
const selected = ref('');
const options = ref<string[]>([]);

onMounted(async () => {
  try {
    isLoading.value = true;
    await loadUsers();
    // Populate options with user names after loading users
    options.value = usersRef.value.map(user => user.name);
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = "Failed to load users";
    console.error("Error loading users:", err);
  }
});

// Add a function to handle post removal
const handleRemove = async (user: User) => {
  try {
    // First remove from local array for immediate UI update
    const index = usersRef.value.findIndex(p => p.id === user.id);
    if (index !== -1) {
      usersRef.value.splice(index, 1);
    }
    
    // Then call the API to remove the post on the server
    await remove(user.id);
  } catch (err) {
    console.error("Error removing post:", err);
    error.value = "Failed to remove post";
    
    // If API call fails, add the post back to the array
    loadUsers(); // Reload posts from server to restore state
  }
};

// Move filteredUsers outside so it's accessible in the template
const filteredUsers = computed(() => {
  if (!selected.value) {
    return usersRef.value;
  }
  return usersRef.value.filter(user => user.name === selected.value);
});

</script>

<template>
  <div>
    <h2>Users</h2>
    <!-- Wrap users in a UL for proper list structure -->

<section>
    <o-field label="Options List">
        <o-autocomplete
            v-model="selected"
            :options="options"
            placeholder="Find a name..."
            open-on-focus>
        </o-autocomplete>

        <p><b>Selected:</b> {{ selected }}</p>
      </o-field>
    </section>

    <ul>
      <li v-for="user in filteredUsers" :key="user.username" class="user-item">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <div class="user-info">
          <span><strong>{{ user.name }}</strong></span>
          <span>Username: {{ user.username }}</span>
          <span v-if="user.is_administrator" class="admin-tag">Administrator</span>
          <button class="button is-danger" @click="handleRemove(user)">Remove User</button>
          <button class="button is-info">Edit User</button>
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

