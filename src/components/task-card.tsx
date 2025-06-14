import { useState } from "react";
import { type Task } from "@/types";
import { Edit, Trash2, CalendarIcon, Clock, View } from "lucide-react";
import { Link } from "react-router";
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
import { useDraggable } from "@dnd-kit/core";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useBoardContext } from "@/context/BoardContext";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useBoardContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: "transform 0.2s ease",
      }
    : undefined;

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
    const updatedTask = {
      ...task,
      title: titleTask,
    };

    dispatch({
      type: "EDIT_TASK",
      payload: { id: task.id, task: updatedTask },
    });
    setEdit(false);
  }

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`relative overflow-hidden transition-all duration-300 ${task.completed ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""} touch-none`}
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
                onCheckedChange={
                  () =>
                    dispatch({
                      type: "TOGGLE_TASK_COMPLETION",
                      payload: { id: task.id, completed: !task.completed },
                    })
                  // onToggleCompletion(!task.completed, task.id)
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
                <span>Due: {format(new Date(task.dueDate), "PPP 'at' p")}</span>
              </div>

              <div className="text-muted-foreground flex items-center text-xs">
                <Clock className="mr-1 h-3 w-3" />
                <span>
                  Created: {format(new Date(task.createdAt), "PPP 'at' p")}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div
              className={`absolute top-2 right-2 flex gap-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip>
                <TooltipTrigger>
                  <Button asChild variant="outline">
                    <Link to={`/task/${task.id}`}>
                      <View />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEdit(true)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      dispatch({ type: "DELETE_TASK", payload: task.id })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </div>
          </CardFooter>
        </>
      ) : (
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-2"
        >
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
