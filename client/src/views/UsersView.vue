<script setup lang="ts">
import UserList from '@/components/UserList.vue';
</script>

<template>
    <div>
        <div class="buttons">
            <button class="button is-primary">Add User</button>
            <button class="button is-danger">Remove User</button>
            <button class="button is-info">Edit User</button>
        </div>
        <h1>This is the admin page</h1>
        <p>Here you will find all of your admin stuff</p>
        <UserList />
    </div>
</template>

<style scoped>
</style>