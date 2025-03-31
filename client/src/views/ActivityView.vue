<script setup lang="ts">
import PostList from '@/components/PostList.vue';

import { ref, computed } from 'vue';

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
//function removePost(index: number) {
//  posts.value.splice(index, 1);
//};

const personalPosts = computed(() => {
  return posts.value.filter(post => post.username === username.value);
});

</script>

<template>
  <div class="activity">
    <h1>This is an activity page</h1>
    <p>Here you will find all of your activities and stuff</p>
    <!---<PostList />-->
    <div>
    <!-- Loop through posts and display each post -->
    <div v-for="(post, index) in personalPosts" :key="index" class="box">
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
              <a class="level-item">
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
  </div>
</template>

<style lang="scss" scoped>

</style>
