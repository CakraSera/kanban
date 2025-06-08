import { Link, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, User, Calendar, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data - in a real app, this would come from your data store
const taskData = {
  "1": {
    id: "1",
    title: "Design landing page",
    description:
      "Create wireframes and mockups for the new landing page. This includes user research, competitor analysis, and creating high-fidelity designs that align with our brand guidelines.",
    priority: "high",
    assignee: "Sarah",
    tags: ["design", "ui/ux"],
    status: "To Do",
    createdAt: "2024-01-15",
    dueDate: "2024-01-25",
    comments: [
      {
        id: 1,
        author: "Mike",
        content: "Looking forward to seeing the designs!",
        timestamp: "2024-01-16",
      },
      {
        id: 2,
        author: "Sarah",
        content: "I'll have the wireframes ready by tomorrow.",
        timestamp: "2024-01-16",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Set up database",
    description: "Configure PostgreSQL database with initial schema",
    priority: "medium",
    assignee: "Mike",
    tags: ["backend", "database"],
    status: "To Do",
    createdAt: "2024-01-14",
    dueDate: "2024-01-20",
    comments: [],
  },
  "3": {
    id: "3",
    title: "Implement authentication",
    description: "Add user login and registration functionality",
    priority: "high",
    assignee: "Alex",
    tags: ["frontend", "auth"],
    status: "In Progress",
    createdAt: "2024-01-13",
    dueDate: "2024-01-22",
    comments: [],
  },
  "4": {
    id: "4",
    title: "Project setup",
    description: "Initialize Next.js project with TypeScript and Tailwind",
    priority: "low",
    assignee: "John",
    tags: ["setup", "config"],
    status: "Done",
    createdAt: "2024-01-10",
    dueDate: "2024-01-12",
    comments: [],
  },
};

export function DetailTaskRoute() {
  const params = useParams();
  const taskId = params.id as string;
  const task = taskData[taskId as keyof typeof taskData];

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
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
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={getPriorityColor(task.priority)}
                >
                  {task.priority} priority
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
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
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-gray-700">
                  {task.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments ({task.comments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {task.comments.length > 0 ? (
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-l-2 border-gray-200 pl-4"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
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
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Assignee</p>
                    <p className="text-sm text-gray-600">{task.assignee}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-gray-600">{task.dueDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Tag className="mt-0.5 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="mb-2 text-sm font-medium">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">
                      Task created on {task.createdAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">
                      Assigned to {task.assignee}
                    </span>
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
