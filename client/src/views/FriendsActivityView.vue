<script setup lang="ts">
import { ref } from "vue";
import { usePostData } from "@/models/postData";
import PostList from "@/components/PostList.vue";

const posts = ref([]); // Initialize posts as an empty array or with appropriate data
</script>

<template>
  <div class="friends-activity">
    <h1>Friends Activity</h1>

    <PostList :posts="posts" :allowRemove="false" />  <!-- Disables the remove button -->

  </div>
</template>









