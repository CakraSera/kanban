export type Task = {
  id: number | string;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: Date;
};
