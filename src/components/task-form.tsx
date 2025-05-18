import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TaskForm({
  addNewTask,
}: {
  addNewTask: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={(event) => addNewTask(event)} className="flex gap-2">
      <Input name="task" type="text" placeholder="Add Your Task" />
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
