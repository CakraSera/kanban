import { useState } from "react";
import { type Task } from "@/types/task";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
};
export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [edit, setEdit] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("🚀 ~ handleSubmit ~ event:", event);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const titleTask: string | undefined = formData
      .get("title-task")
      ?.toString();
    if (!titleTask) {
      console.error("Please enter a task");
      return;
    }
    const idTask = task.id;
    onEdit(titleTask, idTask);
    setEdit(false);
    // setEdit(!edit);
    // onEdit(task);
  }

  return (
    <Card className="flex flex-row items-center justify-evenly p-4">
      {!edit ? (
        <>
          <CardTitle>{task?.title}</CardTitle>
          <div className="flex gap-0.5">
            <Button onClick={() => setEdit(true)}>Edit</Button>
            <Button onClick={() => onDelete(task.id)}>Delete</Button>
          </div>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div
              className={`absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button variant="outline" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardFooter>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="title-task"
            defaultValue={task?.title}
            className="rounded-md border border-gray-300 p-2"
          />
          <div className="flex justify-center gap-2">
            <Button type="submit">Save</Button>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
          </div>
        </form>
      )}
    </Card>
  );
}
