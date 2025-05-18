import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "@/utils/local-storage";

import { TaskCard } from "./components/task-card";
import type { Task, Column } from "./types";
import { TaskAddForm } from "./components/task-add-form";
import { Button } from "./components/ui/button";

export function App() {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const item = getItemLocalStorage("tasks");
    return (
      (item as Task[]) || [
        {
          id: 1,
          title: "Walk the dog",
          description: "Take the dog for a walk in the park",
          status: "IN_PROGRESS",
          completed: false,
          createdAt: new Date("2023-10-01"),
        },
        {
          id: 2,
          title: "Water the plants",
          description: "Water the plants in the garden",
          status: "TODO",
          completed: false,
          createdAt: new Date("2023-10-02"),
        },
        {
          id: 3,
          title: "Wash the dishes",
          description: "Wash the dishes after dinner",
          status: "DONE",
          completed: false,
          createdAt: new Date("2023-10-03"),
        },
      ]
    );
  });

  const COLOMNS: Column[] = [
    { id: "TODO", name: "Todo" },
    { id: "IN_PROGRESS", name: "In Progress" },
    { id: "DONE", name: "Done" },
  ];

  useEffect(() => {
    setItemLocalStorage("tasks", tasks);
  }, [tasks]);

  function addNewTask(task: Task) {
    setTasks([...tasks, task]);
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
        <h1 className="text-center text-2xl font-extrabold">Kanban Board</h1>
        <div className="flex justify-end">
          <Button onClick={() => setIsOpenAddTask(true)} className="mt-4">
            <Plus className="mr-2 h-5 w-5" />
            <p>Add Task</p>
          </Button>
        </div>
        <div className="flex gap-2.5 pt-8">
          {COLOMNS.map((column) => {
            return (
              <div
                key={column.id}
                className="flex flex-col items-center rounded-2xl border-2 p-2"
              >
                <h2 className="text-xl font-bold">{column.name}</h2>
                <ul className="mt-4 space-y-2">
                  {tasks
                    .filter((task) => task.status === column.id)
                    .map((task) => (
                      <li key={task.id}>
                        <TaskCard
                          task={task}
                          onDelete={deleteTask}
                          onEdit={editTask}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>
        <TaskAddForm
          addNewTask={addNewTask}
          isOpen={isOpenAddTask}
          onClose={() => setIsOpenAddTask(false)}
        />
      </section>
    </div>
  );
}
