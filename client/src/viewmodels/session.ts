import { ref, computed } from "vue";
import * as myFetch from '@/models/myFetch';
import { type User } from "@/models/users";

export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return myFetch.api<T>(action, data, method, headers)
}

const session = ref<{ user: User | null }>({
  user: null,
});

export const refSession = () => session;

export const isAdmin = computed(() => session.value.user?.is_administrator === true);

export function login(user: User) {
  session.value.user = user;
}

export function isLoggedIn() {
  return session.value.user !== null;
}

export function logout() {
  session.value.user = null;
}