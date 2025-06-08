import { useEffect, useState } from "react";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "@/utils/local-storage";
import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Tasks } from "@/data/index";
import type { Task, Column } from "./types";
import { TaskForm } from "./components/task-add-form";
import { TaskColumn } from "./components/task-colomn";

export function App() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksLocalStorage = getItemLocalStorage("tasks");
    return (tasksLocalStorage as Task[]) || Tasks;
  });

  const columns: Column[] = [
    { slug: "TODO", name: "Todo" },
    { slug: "IN_PROGRESS", name: "In Progress" },
    { slug: "DONE", name: "Done" },
  ];

  useEffect(() => {
    setItemLocalStorage("tasks", tasks);
  }, [tasks]);

  function addNewTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function editTask(titleTask: string, id: number | string) {
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

  function toggleTaskCompletion(value: boolean, taskId: number | string) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: value, status: "DONE" } : task,
    );
    setTasks(newTasks);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id !== taskId ? task : { ...task, status: newStatus },
      ),
    );
  }

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4">
      <section>
        <h1 className="mb-4 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          Kanban Board
        </h1>
        <div className="flex justify-end pb-4">
          <TaskForm addNewTask={addNewTask} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {columns.map((column) => (
              <TaskColumn
                key={column.slug}
                column={column}
                tasks={tasks}
                onDelete={deleteTask}
                onEdit={editTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            ))}
          </DndContext>
        </div>
      </section>
    </div>
  );
}
