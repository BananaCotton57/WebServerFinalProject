import { ref, computed } from "vue";
import { refSession } from "@/viewmodels/session";
import { api } from "@/viewmodels/session";
import rawPosts from "@/data/activity.json";

export interface Post {
  id: number;
  avatar: string;
  name: string;
  username: string;
  content: string;
  exercise: string; // Adjust based on whether exercise is a name or ID
  created_at: string;
}

export function getAll(): Promise<Post[]> {
  return api<Post[]>('activities');
}

export function get(id: number): Promise<Post> {
  return api<Post>(`activities/${id}`);
}

export function create(data: Post) {
  return api<Post>('activities', data)
}

export function update(id: number, data: Post) {
  return api<Post>(`activities/${id}`, data, 'PATCH')
}

export function remove(id: number) {
  return api<Post>(`activities/${id}`, undefined, 'DELETE')
}

export const postsRef = ref<Post[]>([]);

export function loadPosts() {
  return getAll().then(data => {
    postsRef.value = data;
    return data;
  });
}

// Convert the raw JSON data into a reactive ref
export const posts = ref<Post[]>(rawPosts);

// Add/remove logic stays the same
export function addPost(newPost: Post) {
  posts.value.unshift(newPost);
}

export function removePost(index: number) {
  posts.value.splice(index, 1);
}

// Filter based on current session user
export const filteredPosts = computed(() => {
  const session = refSession();
  return posts.value.filter(post => post.username === session.value.user?.username);
});

export function usePostData() {
  return {
    posts,
    addPost,
    removePost,
  };
}

