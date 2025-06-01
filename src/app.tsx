import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "@/utils/local-storage";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./components/task-card";
import type { Task, Column } from "./types";
import { TaskForm } from "./components/task-add-form";
import { Button } from "./components/ui/button";

export function App() {
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const todoDroppable = useDroppable({ id: "TODO" });
  const inProgressDroppable = useDroppable({ id: "IN_PROGRESS" });
  const doneDroppable = useDroppable({ id: "DONE" });
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
      ]
    );
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

  function changeTaskCompletion(value: boolean, taskId: number | string) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: value } : task,
    );
    setTasks(newTasks);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log(event);
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <section>
        <h1 className="text-center text-2xl font-extrabold">Kanban Board</h1>
        <div className="flex justify-end">
          <Button onClick={() => setIsOpenAddTask(true)} className="mt-4">
            <Plus className="mr-2 h-5 w-5" />
            <p>Add Task</p>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2.5 pt-8">
          <DndContext onDragEnd={handleDragEnd}>
            {columns.map((column) => {
              const tasksInColumn = tasks.filter(
                (task) => task.status === column.slug,
              );
              const droppableRef =
                column.slug === "TODO"
                  ? todoDroppable.setNodeRef
                  : column.slug === "IN_PROGRESS"
                    ? inProgressDroppable.setNodeRef
                    : doneDroppable.setNodeRef;
              return (
                <div
                  key={column.slug}
                  ref={droppableRef}
                  className="flex flex-col items-center rounded-2xl border-2 p-2"
                >
                  <h2 className="text-xl font-bold">{column.name}</h2>
                  <ul className="mt-4 h-full space-y-2">
                    {tasksInColumn.length == 0 ? (
                      <div className="flex h-full items-center justify-center">
                        <h3 className="font-bold">No Tasks</h3>
                      </div>
                    ) : (
                      tasksInColumn.map((task) => (
                        <li key={task.id}>
                          <TaskCard
                            task={task}
                            onDelete={deleteTask}
                            onEdit={editTask}
                            onToggleCompletion={changeTaskCompletion}
                          />
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              );
            })}
          </DndContext>
        </div>
        <TaskForm
          addNewTask={addNewTask}
          isOpen={isOpenAddTask}
          onClose={() => setIsOpenAddTask(false)}
        />
      </section>
    </div>
  );
}
