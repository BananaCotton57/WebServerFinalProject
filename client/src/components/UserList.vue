<script setup lang="ts">
import { ref } from 'vue';
import users from '@/data/users.json';

/*
const users = ref([{
  avatar: "https://bulma.io/assets/images/placeholders/128x128.png", 
  name: "John Smith", 
  username: "johnsmith",
  isAdministrator: true
},
{ 
  avatar: "https://bulma.io/assets/images/placeholders/128x128.png",
  name: "Jane Doe",
  username: "janedoe",
  isAdministrator: false
}]);
*/
//will be replaced with a fetch call to the json file (temporary database)

</script>

<template>
  <div>
    <div class="buttons">
      <button class="button is-primary">Add User</button>
      <button class="button is-danger">Remove User</button>
      <button class="button is-info">Edit User</button>
    </div>
    <h2>Users</h2>
    <!-- Wrap users in a UL for proper list structure -->
    <ul>
      <li v-for="user in users" :key="user.username" class="user-item">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <div class="user-info">
          <span><strong>{{ user.name }}</strong></span>
          <span>{{ user.username }}</span>
          <span v-if="user.isAdministrator" class="admin-tag">Administrator</span>
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

