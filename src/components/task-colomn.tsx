import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "@/components/task-card";
import type { Column, Task } from "@/types";

type TaskColumnProps = {
  column: Column;
  tasks: Task[];
  onDelete: (id: number | string) => void;
  onEdit: (title: string, id: number | string) => void;
  onToggleCompletion: (value: boolean, taskId: number | string) => void;
};

export function TaskColumn({
  column,
  tasks,
  onDelete,
  onEdit,
  onToggleCompletion,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.slug,
  });
  const tasksInColumn = tasks.filter((task) => task.status === column.slug);

  return (
    <div
      ref={setNodeRef}
      className="flex min-h-72 flex-col items-center rounded-2xl border-2 p-2 md:w-full"
    >
      <h2 className="text-xl font-bold">{column.name}</h2>
      <ul className="mt-4 h-full w-full space-y-2 px-2">
        {tasksInColumn.length == 0 ? (
          <div className="flex h-full items-center justify-center">
            <h3 className="font-bold">No Tasks</h3>
          </div>
        ) : (
          tasksInColumn.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggleCompletion={onToggleCompletion}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
