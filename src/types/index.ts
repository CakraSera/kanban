export type Task = {
  id: number | string;
  title: string;
  description?: string;
  status: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date;
};

export type Column = {
  slug: "TODO" | "IN_PROGRESS" | "DONE";
  name: string;
};
