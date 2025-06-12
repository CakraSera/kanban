import type { Task } from "@/types";

export const Tasks: Task[] = [
  {
    id: "d5829e44-c7e7-4764-ac40-2e879b9b26ba",
    title: "Walk the dog",
    description: "Take the dog for a walk in the park",
    status: "IN_PROGRESS",
    completed: false,
    createdAt: new Date("2025-10-01"),
    dueDate: new Date("2025-10-01"),
  },
  {
    id: "6c9dd5d5-49b9-46e1-9563-5b3a82b91088",
    title: "Water the plants",
    description: "Water the plants in the garden",
    status: "TODO",
    completed: false,
    createdAt: new Date("2025-10-02"),
    dueDate: new Date("2025-10-02"),
  },
  {
    id: "1358e45b-4a19-47b7-af1d-13769e2fc3ca",
    title: "Wash the dishes",
    description: "Wash the dishes after dinner",
    status: "DONE",
    completed: false,
    createdAt: new Date("2025-10-03"),
    dueDate: new Date("2025-10-03"),
  },
];
