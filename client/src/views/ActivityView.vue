<script setup lang="ts">
import { computed } from "vue";
import PostList from "@/components/PostList.vue";
import { usePostData, filteredPosts } from "@/models/postData";


</script>

<template>
  <div>
    <h1>Activity Feed</h1>
    <!-- Directly pass the computed property (no .value needed in the template) -->
    <PostList :posts="filteredPosts" :allow-remove="false" /> 
  </div>
</template>



