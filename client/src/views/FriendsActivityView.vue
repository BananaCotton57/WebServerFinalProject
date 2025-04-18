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

const addNewPost = () => {
  if (!newPostContent.value) return;

  addPost({
    avatar: "https://bulma.io/assets/images/placeholders/128x128.png",
    name: "John Smith",
    username: "johnsmith",
    //time: new Date().toLocaleString(),
    content: newPostContent.value,
    exercise: selectedExercise.value,
  });

  newPostContent.value = '';
  selectedExercise.value = 'Running';
  toggleModal();
};
</script>

<template>
  <div class="friends-activity">
    <h1>Friends Activity</h1>

    <PostList :posts="posts" :allowRemove="false" />  <!-- Disables the remove button -->

  </div>
</template>









