import { ref, computed } from "vue";
import { refSession } from "@/viewmodels/session";
import { api } from "@/viewmodels/session";
import rawPosts from "@/data/activity.json";

// The Post interface as returned by the API (after transformation)
export interface Post {
  id?: number;
  avatar: string;
  name: string;
  username: string;
  content: string;
  exercise: string;
  created_at: string;
}

// The payload needed to create a new post (what the backend expects)
export interface PostCreatePayload {
  user_id: number;
  exercise_id: number;
  content: string;
  created_at: string;
}

export function getAll(): Promise<Post[]> {
  return api<Post[]>('activities');
}

export function get(id: number): Promise<Post> {
  return api<Post>(`activities/${id}`);
}

export function create(data: PostCreatePayload): Promise<Post> {
  return api<Post>('activities', data);
}

export function update(id: number, data: Partial<Post>): Promise<Post> {
  return api<Post>(`activities/${id}`, data, 'PATCH');
}

export function remove(id: number): Promise<Post> {
  return api<Post>(`activities/${id}`, undefined, 'DELETE');
}

export const postsRef = ref<Post[]>([]);

export function loadPosts() {
  return getAll().then(data => {
    postsRef.value = data;
    return data;
  });
}

// Convert the raw JSON data into a reactive ref (for offline/demo mode)
export const posts = ref<Post[]>(rawPosts);

// Add/remove logic for local JSON data
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