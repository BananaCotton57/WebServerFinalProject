<script setup lang="ts">
import { ref, onMounted } from "vue";
import PostList from "@/components/PostList.vue";
import { filteredPosts, create, loadPosts, postsRef } from "@/models/postData";
import { exercisesRef } from "@/models/exercises";
import { refSession, isLoggedIn } from "@/viewmodels/session";

const isModalActive = ref(false);
const newPostContent = ref('');
const selectedExerciseId = ref(1); // Store the exercise ID, not the name
const isLoading = ref(false);
const error = ref<string | null>(null);

const session = refSession();

// Load posts when component mounts
onMounted(async () => {
  try {
    await loadPosts();
  } catch (err) {
    console.error("Error loading posts:", err);
  }
});

const toggleModal = () => {
  isModalActive.value = !isModalActive.value;
};

const addNewPost = async () => {
  if (!isLoggedIn()) {
    alert("You must be logged in to add a post.");
    return;
  }
  
  if (!newPostContent.value) {
    alert("Post content cannot be empty.");
    return;
  }

  isLoading.value = true;
  error.value = null;
  
  try {
    // Create post payload according to the backend API requirements
    if (!session.value.user?.id) {
      throw new Error("User ID is undefined. Please ensure the user is logged in.");
    }

    const newPostPayload = {
      user_id: session.value.user.id, // This should be the user's ID
      exercise_id: selectedExerciseId.value, // The ID of the selected exercise
      content: newPostContent.value,
      created_at: new Date().toISOString()
    };
    
    // Send post to the server
    const createdPost = await create(newPostPayload);
    
    // Reload all posts to get the updated list including our new post
    await loadPosts();
    
    // Reset form and close modal
    newPostContent.value = '';
    selectedExerciseId.value = 1;
    toggleModal();
  } catch (err) {
    console.error("Failed to add post:", err);
    error.value = "Failed to add post. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <button class="button is-primary" v-if="isLoggedIn() && !isLoading" @click="toggleModal">Add Post</button>
    <button class="button is-primary is-loading" v-else-if="isLoading">Adding Post...</button>
    
    <h1 class="title mt-4">Activity Feed</h1>
    
    <div v-if="error" class="notification is-danger">
      {{ error }}
    </div>
    
    <!-- Display posts -->
    <PostList :posts="filteredPosts" :allow-remove="true" />
    
    <!-- Add Post Modal -->
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
                <div class="select">
                  <select v-model="selectedExerciseId">
                    <option v-for="exercise in exercisesRef" :key="exercise.id" :value="exercise.id">
                      {{ exercise.exercise }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-primary" :class="{'is-loading': isLoading}" :disabled="isLoading">
                  Submit Post
                </button>
              </div>
              <div class="control">
                <button type="button" class="button" @click="toggleModal">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
    </div>
  </div>
</template>