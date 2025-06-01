import { useState } from "react";
import { type Task } from "@/types";
import { Edit, Trash2, CalendarIcon, Clock } from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

type TaskCardProps = {
  task: Task;
  onEdit: (titleTask: string, id: number) => void;
  onDelete: (taskId: number | string) => void;
  onToggleCompletion: (value: boolean, taskId: number | string) => void;
};
export function TaskCard({
  task,
  onToggleCompletion,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const titleTask: string | undefined = formData
      .get("title-task")
      ?.toString();
    if (!titleTask) {
      console.error("Please enter a task");
      return;
    }
    const idTask = Number(task.id);
    onEdit(titleTask, idTask);
    setEdit(false);
    // setEdit(!edit);
    // onEdit(task);
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${task.completed ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""} `}
      // className="flex flex-row items-center justify-evenly p-4 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!edit ? (
        <>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Checkbox
                id="task"
                checked={task.completed}
                onCheckedChange={() =>
                  onToggleCompletion(!task.completed, task.id)
                }
              />
              <Label htmlFor="task">
                <CardTitle>{task.title}</CardTitle>
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
            <div className="mt-3 flex flex-col gap-1">
              <div className="text-muted-foreground flex items-center text-xs">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span>Due: {format(task.dueDate, "PPP")}</span>
              </div>

              <div className="text-muted-foreground flex items-center text-xs">
                <Clock className="mr-1 h-3 w-3" />
                <span>Created: {format(task.createdAt, "PPP")}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div
              className={`absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEdit(true)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
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
