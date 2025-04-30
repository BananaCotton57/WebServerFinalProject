<script setup lang="ts">
import{ref, onMounted} from 'vue';
import { usePostData, loadPosts, postsRef, remove, type Post } from "@/models/postData";
import { removePost } from "@/models/postData";

defineProps<{
  posts: Post[],
  allowRemove: boolean,
}>();

const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => { //im copying all of the isLoading and error a lot. I should probably make a function for this
  try {
    isLoading.value = true;
    await loadPosts();
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = "Failed to load posts";
    console.error("Error loading posts:", err);
  }
});

// Add a function to handle post removal
const handleRemove = async (post: Post) => {
  try {
    // First remove from local array for immediate UI update
    const index = postsRef.value.findIndex(p => p.id === post.id);
    if (index !== -1) {
      postsRef.value.splice(index, 1);
    }
    
    // Then call the API to remove the post on the server
    await remove(post.id);
  } catch (err) {
    console.error("Error removing post:", err);
    error.value = "Failed to remove post";
    
    // If API call fails, add the post back to the array
    loadPosts(); // Reload posts from server to restore state
  }
};

</script>

<template>
  <div>
    <div v-for="post in postsRef" :key="post.id" class="box">
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
              <a v-if="allowRemove" class="level-item" @click="handleRemove(post)">
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

