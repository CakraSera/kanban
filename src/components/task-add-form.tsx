import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import type { Task } from "@/types";
type addNewTaskProps = {
  addNewTask: (task: Task) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function TaskAddForm({ addNewTask, isOpen, onClose }: addNewTaskProps) {
  const [status, setStatus] = useState<string>("TODO");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const titleTask: string | undefined = formData.get("title")?.toString();
    const descriptionTask: string | undefined = formData
      .get("description")
      ?.toString();
    if (!titleTask) {
      console.error("Please enter a task");
      return;
    }
    const newId = nanoid();
    const task = {
      id: newId,
      title: titleTask,
      description: descriptionTask,
      status: status,
      completed: false,
      createdAt: new Date(),
    };
    addNewTask(task);
    resetForm(event);
    onClose();
  }

  function resetForm(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    formData.set("title", "");
    formData.set("description", "");
    setStatus("TODO");
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        console.log("🚀 ~ TaskAddForm ~ open:", open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="pb-4">Add New Task</DialogTitle>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input name="title" type="text" placeholder="Add Your Task Title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              name="description"
              placeholder="Add Your Task Description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-full" id="status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="TODO">Todo</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
