import type { Task } from "@/types";

export const Tasks: Task[] = [
  {
    id: 1,
    title: "Walk the dog",
    description: "Take the dog for a walk in the park",
    status: "IN_PROGRESS",
    completed: false,
    createdAt: new Date("2023-10-01"),
    dueDate: new Date("2023-10-01"),
  },
  {
    id: 2,
    title: "Water the plants",
    description: "Water the plants in the garden",
    status: "TODO",
    completed: false,
    createdAt: new Date("2023-10-02"),
    dueDate: new Date("2023-10-02"),
  },
  {
    id: 3,
    title: "Wash the dishes",
    description: "Wash the dishes after dinner",
    status: "DONE",
    completed: false,
    createdAt: new Date("2023-10-03"),
    dueDate: new Date("2023-10-03"),
  },
];
