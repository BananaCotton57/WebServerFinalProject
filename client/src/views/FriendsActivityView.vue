<script setup lang="ts">
import { ref } from 'vue';

const posts = ref([
  {
    avatar: "https://bulma.io/assets/images/placeholders/128x128.png", 
    name: "John Smith", 
    username: "johnsmith", 
    time: getDate(), 
    content: "Running around Town!",
    exercise: "Running"
  },
  {
    avatar: "https://bulma.io/assets/images/placeholders/128x128.png", 
    name: "Jane Doe", 
    username: "janedoe", 
    time: getDate(), 
    content: "Nullam condimentum luctus turpis. Curabitur scelerisque libero ac sapien dignissim hendrerit.",
    exercise: "Cycling"
  }
]);

const username = ref("johnsmith");

function getDate() {
  const date = new Date();
  return date.toLocaleString();
}

// Function to remove a post from the array by index
function removePost(index: number) {
  posts.value.splice(index, 1);
};

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

  // Add the new post to the posts array
  posts.value.unshift(newPost);

  // Reset the form fields
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

    <div>
      <!-- Loop through posts and display each post -->
      <div v-for="(post, index) in posts" :key="index" class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="post.avatar" alt="Avatar" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ post.name }}</strong> <small>@{{ post.username }}</small>
                <small> {{ post.time }}</small>
                <small><strong> Exercise: {{ post.exercise }} </strong></small>
                <br />
                {{ post.content }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="retweet">
                  <span class="icon is-small">
                    <i class="fas fa-retweet" aria-hidden="true"></i>
                  </span>
                </a>
                <a class="level-item" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                </a>
                <!-- Button to remove the post -->
                <a class="level-item" @click="removePost(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>

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








