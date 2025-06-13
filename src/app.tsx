import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useBoardContext } from "@/context/BoardContext";
import { Tasks } from "@/data/index";
import type { Task, Column } from "./types";
import { TaskForm } from "./components/task-add-form";
import { TaskColumn } from "./components/task-colomn";

export function App() {
  const { state, dispatch } = useBoardContext();
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
    dispatch({ type: "DELETE_TASK", payload: id });
    const newTodos = tasks.filter((task) => task.id != id);
    setTasks(newTodos);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    dispatch({
      type: "DRAG_TASK",
      payload: { id: taskId, status: newStatus },
    });
  }

  return (
    <div className="container mx-auto px-2 py-4 sm:px-4">
      <section>
        <h1 className="mb-4 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          Kanban Board
        </h1>
        <div className="flex justify-end pb-4">
          <TaskForm />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {state?.columns.map((column) => (
              <TaskColumn
                key={column.slug}
                column={column}
                tasks={state.tasks}
              />
            ))}
          </DndContext>
        </div>
      </section>
    </div>
  );
}
