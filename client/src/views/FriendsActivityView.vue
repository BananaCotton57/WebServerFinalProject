<script setup lang="ts">
import { ref } from "vue";
import { usePostData } from "@/models/postData";
import PostList from "@/components/PostList.vue";

const { posts, addPost } = usePostData();
const isModalActive = ref(false);
const newPostContent = ref('');
const selectedExercise = ref('Running');

const toggleModal = () => {
  isModalActive.value = !isModalActive.value;
};

</script>

<template>
  <div class="friends-activity">
    <h1>Friends Activity</h1>

    <PostList :posts="posts" :allowRemove="false" />  <!-- Disables the remove button -->

  </div>
</template>









