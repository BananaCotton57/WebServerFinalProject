<script setup lang="ts">
import { usePostData, type Post } from "@/models/postData";
import { removePost } from "@/models/postData";

defineProps<{
  posts: Post[],
  allowRemove: boolean,
}>();

</script>

<template>
  <div>
    <div v-for="(post, index) in [...posts].reverse()" :key="index" class="box">
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
              <!-- Only show remove button if allowRemove is true -->
              <a v-if="allowRemove" class="level-item" @click="removePost(posts.length - 1 - index)">
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

