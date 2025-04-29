import { ref } from "vue";
import { api } from "@/viewmodels/session"; // Import from viewmodels
import rawUsers from "@/data/users.json"; // Local JSON data

export interface User {
  id: number;
  avatar: string;
  name: string;
  username: string;
  is_administrator: boolean;
}

// Convert the raw JSON data into a reactive ref
//export const jsonUsers = ref<User[]>(rawUsers);

// This should return User[] not just User
export function getAll(): Promise<User[]> {
  return api<User[]>('users');
}

export function get(id: number): Promise<User> {
  return api<User>(`users/${id}`);
}

// Don't call the function directly here - it will execute immediately
// and won't be reactive in components
export const usersRef = ref<User[]>([]);

export function loadUsers() {
  return getAll().then(data => {
    usersRef.value = data;
    return data;
  });
}

/*
export function addUser(newUser: User) {
  jsonUsers.value.unshift(newUser);
}

export function removeUser(index: number) {
  jsonUsers.value.splice(index, 1);
}
*/