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
    time: new Date().toLocaleString(),
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
    <button class="button is-primary" @click="toggleModal">Add Post</button>
    <h1>Friends Activity</h1>

    <PostList :posts="posts" :allowRemove="true" />  <!-- Enables the remove button -->

    <div class="modal" :class="{'is-active': isModalActive}">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Add a New Post</h2>
          <form @submit.prevent="addNewPost">
            <div class="field">
              <label class="label">Post Content</label>
              <div class="control">
                <textarea class="textarea" v-model="newPostContent" placeholder="What's on your mind?"></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Exercise Type</label>
              <div class="control">
                <select v-model="selectedExercise">
                  <option>Running</option>
                  <option>Cycling</option>
                  <option>Swimming</option>
                  <option>Walking</option>
                </select>
              </div>
            </div>
            <div class="field">
              <button type="submit" class="button is-primary">Submit Post</button>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>









