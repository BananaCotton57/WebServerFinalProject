import { ref } from "vue";
//import rawExercises from "@/data/users.json"; // Ensure this file exists and contains the required data
import { api } from "@/viewmodels/session";

export interface Exercise {
  id: number;
  exercise: string;
}

export function getAll(): Promise<Exercise[]> {
  return api<Exercise[]>('exerciseTypes');
}

export function get(id: number): Promise<Exercise> {
  return api<Exercise>(`exerciseTypes/${id}`);
}

export function create(data: Exercise) {
  return api<Exercise>('exerciseTypes', data)
}

export function update(id: number, data: Exercise) {
  return api<Exercise>(`exerciseTypes/${id}`, data, 'PATCH')
}

export function remove(id: number) {
  return api<Exercise>(`exerciseTypes/${id}`, undefined, 'DELETE')
}

export const exercisesRef = ref<Exercise[]>([]);

export function loadExercises() {
  return getAll().then(data => {
    exercisesRef.value = data;
    return data;
  });
}
/*
export const Exercises = ref<Exercise[]>(
  rawExercises.map((item) => ({ exercise: item.name }))
);

export function addExercise(newExercise: Exercise) {
  Exercises.value.unshift(newExercise);
}

export function removeExercise(index: number) {
  Exercises.value.splice(index, 1);
}
  */

//will add other functions from server