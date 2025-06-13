import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import type { Task } from "@/types";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBoardContext } from "@/context/BoardContext";

const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  dueDate: z.date(),
});

export function TaskForm() {
  const { dispatch } = useBoardContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("TODO");

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      dueDate: new Date(),
      status: "TODO",
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof taskFormSchema>) {
    const task = {
      id: nanoid(),
      title: values.title,
      description: values.description,
      status: status,
      completed: false,
      createdAt: new Date(),
      dueDate:
        values.dueDate instanceof Date
          ? values.dueDate
          : new Date(values.dueDate),
    };
    dispatch({ type: "ADD_TASK", payload: task });

    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger>
        <Button className="mt-4">
          <Plus className="mr-2 h-5 w-5" />
          <p>Add Task</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="pb-4">Add New Task</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="title">Task Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Add Your Task Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="description">Task Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Your Task Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={() => (
                <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                  >
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
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onValueChange={(value) => field.onChange(value)}
                      date={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
