<script setup lang="ts">
import PostList from "@/components/PostList.vue";
import { usePostData } from "@/models/postData";

// Access the computed personalPosts from the postData.ts file
const { personalPosts } = usePostData();
</script>

<template>
  <div>
    <h1>Activity Feed</h1>
    <!-- Directly pass the computed property (no .value needed in the template) -->
    <PostList :posts="personalPosts" /> 
  </div>
</template>



