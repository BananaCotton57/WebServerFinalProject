<script setup lang="ts">
import { ref } from 'vue';

// Create the posts array as reactive data

const posts = ref([
  {
    avatar: "https://bulma.io/assets/images/placeholders/128x128.png", 
    name: "John Smith", 
    username: "johnsmith", 
    time: getDate(), 
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas.",
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

function getDate() {
  const date = new Date();
  return date.toLocaleString();
}

// Function to remove a post from the array by index
function removePost(index: number) {
  posts.value.splice(index, 1);
};
</script>

<template>
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
              <small>{{ post.time }}</small>
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
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>
