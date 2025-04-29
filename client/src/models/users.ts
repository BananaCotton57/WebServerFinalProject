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
export const Users = ref<User[]>(rawUsers);

export function addUser(newUser: User) {
  Users.value.unshift(newUser);
}

export function removeUser(index: number) {
  Users.value.splice(index, 1);
}

//will add other functions from server

