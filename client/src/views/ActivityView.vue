<script setup lang="ts">
import PostList from "@/components/PostList.vue";
import { usePostData } from "@/models/postData";

// Access the computed personalPosts from the postData.ts file
const { personalPosts } = usePostData();
</script>

<template>
  <div>
    <h1>Activity Feed</h1>
    <!-- Pass the filtered posts (personalPosts) to PostList -->
    <PostList :posts="personalPosts" /> 
  </div>
</template>


