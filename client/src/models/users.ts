import { ref } from "vue";
import {api} from "@/viewmodels/session"; // Ensure this file exists and contains the required data
import rawUsers from "@/data/users.json"; // Ensure this file exists and contains the required data

export interface User {
  id: number;
  avatar: string;
  name: string;
  username: string;
  isAdministrator: boolean;
}

// Convert the raw JSON data into a reactive ref
export const jsonUsers = ref<User[]>(rawUsers);

export function getAll(): Promise<User> {
  return api('users');
}

export const supabaseUsers = getAll();

export function addUser(newUser: User) {
  jsonUsers.value.unshift(newUser);
}

export function removeUser(index: number) {
  jsonUsers.value.splice(index, 1);
}

//will add other functions from server

