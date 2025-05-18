import { useState } from "react";
import { nanoid } from "nanoid";
import { TaskCard } from "./components/task-card";
import type { Task } from "./types/task";
import { TaskForm } from "./components/task-form";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Walk the dog",
      description: "Take the dog for a walk in the park",
      completed: false,
      createdAt: new Date("2023-10-01"),
    },
    {
      id: 2,
      title: "Water the plants",
      description: "Water the plants in the garden",
      completed: false,
      createdAt: new Date("2023-10-02"),
    },
    {
      id: 3,
      title: "Wash the dishes",
      description: "Wash the dishes after dinner",
      completed: false,
      createdAt: new Date("2023-10-03"),
    },
  ]);

  function addNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const task: string | undefined = formData.get("task")?.toString();
    console.log("🚀 ~ addNewTask ~ task:", task);
    if (!task) {
      console.error("Please enter a task");
      return;
    }
    const newId = nanoid();
    console.log("🚀 ~ addNewTask ~ newId:", newId);
    setTasks([
      ...tasks,
      {
        id: newId,
        title: task,
        description: "",
        completed: false,
        createdAt: new Date(),
      },
    ]);
  }

  function editTask(titleTask: string, id: number | string) {
    console.log("🚀 ~ editTask ~ id:", id);
    console.log("🚀 ~ editTask ~ titleTask:", titleTask);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) {
      console.error("Task not found");
      return;
    }
    const updatedTask = { ...taskToEdit, title: titleTask };
    const newTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
    setTasks(newTasks);
  }

  function deleteTask(id: number | string) {
    const newTodos = tasks.filter((task) => task.id != id);
    setTasks(newTodos);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <section>
        <h1 className="text-2xl font-bold">Task List</h1>
        <div>
          <TaskForm addNewTask={addNewTask} />
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} onDelete={deleteTask} onEdit={editTask} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
