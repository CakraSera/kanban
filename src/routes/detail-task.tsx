import { useState } from "react";
import { Link, useParams } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getItemLocalStorage } from "@/utils/local-storage";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/types";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export function DetailTaskRoute() {
  const { taskId } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const task = getItemLocalStorage("tasks")?.find(
    (task: { id: string | number }) => String(task.id) === taskId,
  );

  function onSubmitDescription(values: z.infer<typeof formSchema>) {
    if (task) {
      const updatedTask = {
        ...task,
        description: values.description,
      };
      const tasks = getItemLocalStorage("tasks") || [];
      const updatedTasks = tasks.map((t: Task) =>
        t.id === task.id ? updatedTask : t,
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditable(false);
    }
    form.reset();
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold">Task not found</h2>
            <p className="mb-4 text-gray-600">
              The task you're looking for doesn't exist.
            </p>
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Kanban
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Kanban
            </Link>
          </Button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {task.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2"></div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              {/* <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader> */}
              <CardContent>
                {!editable ? (
                  <div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditable(true);
                        }}
                      >
                        <Edit />
                      </Button>
                    </div>
                    <p className="leading-relaxed text-gray-700">
                      {task.description}
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitDescription)}
                      className="mx-auto max-w-3xl space-y-8 py-10"
                    >
                      <FormField
                        control={form.control}
                        name="description"
                        defaultValue={task.description || ""}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Add Your Task Description"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="submit">Save</Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditable(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Created At</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(task.createdAt), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(task.dueDate), "PPP 'at' p")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
