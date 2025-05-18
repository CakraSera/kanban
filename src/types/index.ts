export type Task = {
  id: number | string;
  title: string;
  description?: string;
  status: string;
  completed: boolean;
  createdAt: Date;
};

export type Column = {
  id: string;
  name: string;
};
