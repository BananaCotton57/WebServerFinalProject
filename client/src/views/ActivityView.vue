<script setup lang="ts">
import { computed } from "vue";
import PostList from "@/components/PostList.vue";
import { usePostData } from "@/models/postData";

// Access the computed personalPosts from the postData.ts file
const { posts, username } = usePostData();

const personalPosts = computed(() => {
  return posts.value.filter((post) => post.username === username.value);
});

</script>

<template>
  <div>
    <h1>Activity Feed</h1>
    <!-- Directly pass the computed property (no .value needed in the template) -->
    <PostList :posts="personalPosts" /> 
  </div>
</template>



