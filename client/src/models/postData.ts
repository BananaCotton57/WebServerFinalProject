import { ref, computed } from "vue";
import { refSession } from "@/viewmodels/session";

export interface Post {
  avatar: string;
  name: string;
  username: string;
  time: string;
  content: string;
  exercise: string;
}

// Function to get current date/time
export function getDate(): string {
  return new Date().toLocaleString();
}

// The reactive array of posts
export const posts = ref<Post[]>([
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

// Reactive username (now unused)
// const username = ref("johnsmith");

// Function to add a new post
export function addPost(newPost: Post) {
    posts.value.unshift(newPost);
}

// Function to remove a post
export function removePost(index: number) {
  posts.value.splice(index, 1);
}

// Computed property to get posts of a personal user
export const filteredPosts = computed(() => {
  const session = refSession();
  return posts.value.filter(post => post.name === session.value.user?.name);
});

// Export everything
export function usePostData() {
  return {
    posts,
    addPost,
    removePost,
  };
}
