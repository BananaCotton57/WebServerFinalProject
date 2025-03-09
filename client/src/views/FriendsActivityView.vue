<script setup lang="ts">
import { ref } from 'vue';
import PostList from "@/components/PostList.vue";

// Reactive variable to control modal visibility
const isModalActive = ref(false);

// Reactive variables for the form
const newPostContent = ref('');
const selectedExercise = ref('Running');

// Function to toggle the modal
const toggleModal = () => {
  isModalActive.value = !isModalActive.value;
};

// Function to handle form submission (creating a new post)
const addNewPost = () => {
  const newPost = {
    avatar: "https://bulma.io/assets/images/placeholders/128x128.png",
    name: "John Smith", // Ideally, this would come from user data
    username: "johnsmith", // Ideally, this would come from user data
    time: new Date().toLocaleString(),
    content: newPostContent.value,
    exercise: selectedExercise.value,
  };
  
  // You can push the new post to a posts array or pass it to a parent component
  // Assuming you have a posts array in the parent component, you can emit the new post
  // Example: emit("addPost", newPost);

  // Reset the form
  newPostContent.value = '';
  selectedExercise.value = 'Running';

  // Close the modal after submission
  toggleModal();
};
</script>

<template>
  <div class="friends-activity">
    <button class="button is-primary" @click="toggleModal">Add Post</button>
    <h1>This is the Friends Activity page</h1>
    <p>Here you will find all of your friends' activities and stuff</p>
    <PostList />

    <!-- Modal Structure -->
    <div class="modal" :class="{'is-active': isModalActive}">
      <div class="modal-background" @click="toggleModal"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Add a New Post</h2>
          <form @submit.prevent="addNewPost">
            <div class="field">
              <label class="label">Post Content</label>
              <div class="control">
                <textarea 
                  class="textarea" 
                  v-model="newPostContent" 
                  placeholder="What's on your mind?"></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Exercise Type</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedExercise">
                    <option>Running</option>
                    <option>Cycling</option>
                    <option>Swimming</option>
                    <option>Walking</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-primary">Submit Post</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>

<style scoped>
/* You can add any custom styles here */
</style>



