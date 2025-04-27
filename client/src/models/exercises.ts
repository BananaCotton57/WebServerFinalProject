import { ref } from "vue";
import rawExercises from "@/data/users.json"; // Ensure this file exists and contains the required data

export interface Exercise {
  exercise: string;
}

// Convert the raw JSON data into a reactive ref
export const Exercises = ref<Exercise[]>(
  rawExercises.map((item) => ({ exercise: item.name }))
);

export function addExercise(newExercise: Exercise) {
  Exercises.value.unshift(newExercise);
}

export function removeExercise(index: number) {
  Exercises.value.splice(index, 1);
}

//will add other functions from server