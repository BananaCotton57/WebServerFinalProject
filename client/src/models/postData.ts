import { ref, computed } from "vue";

export interface Post {
  avatar: string;
  name: string;
  username: string;
  time: string;
  content: string;
  exercise: string;
}

// Function to get current date/time
function getDate(): string {
  return new Date().toLocaleString();
}

// The reactive array of posts
const posts = ref<Post[]>([
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

// Reactive username
const username = ref("johnsmith");

// Function to add a new post
function addPost(newPost: Post) {
    posts.value.unshift(newPost);
}

// Function to remove a post
function removePost(index: number) {
  posts.value.splice(index, 1);
}

// Computed property to get posts of a specific user
const personalPosts = computed(() => {
  return posts.value.filter((post) => post.username === username.value);
});

// Export everything
export function usePostData() {
  return {
    posts,
    username,
    addPost,
    removePost,
    personalPosts,
  };
}
