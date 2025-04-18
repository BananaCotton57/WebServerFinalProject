<script setup lang="ts">
import { ref } from "vue";
import PostList from "@/components/PostList.vue";
import { usePostData, filteredPosts } from "@/models/postData";
import { refSession, isLoggedIn } from "@/viewmodels/session";
const { addPost } = usePostData();

const isModalActive = ref(false);
const newPostContent = ref('');
const selectedExercise = ref('Running');

const session = refSession();

const toggleModal = () => {
  isModalActive.value = !isModalActive.value;
};

const addNewPost = () => {
  if (!isLoggedIn()) {
    alert("You must be logged in to add a post.");
    return;
  }
  if (!newPostContent.value) return;

  addPost({
    avatar: session.value.user?.avatar || "https://bulma.io/assets/images/placeholders/128x128.png",
    name: session.value.user?.name || "Anonymous",
    username: session.value.user?.username || "anonymous",
    //time: new Date().toLocaleString(),
    content: newPostContent.value,
    exercise: selectedExercise.value,
  });

  newPostContent.value = '';
  selectedExercise.value = 'Running';
  toggleModal();
};



// Removed conflicting local ref function declaration
</script>

<template>
  <div>
    <button class="button is-primary" v-if="isLoggedIn()" @click="toggleModal">Add Post</button>
    <h1>Activity Feed</h1>
    <!-- Directly pass the computed property (no .value needed in the template) -->
    <PostList :posts="filteredPosts" :allow-remove="true" />

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



