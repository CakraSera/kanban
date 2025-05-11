import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Walk the dog",
    },
    {
      id: 2,
      title: "Water the plants",
    },
    {
      id: 3,
      title: "Wash the dishes",
    },
  ]);

  function addNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const task: string | undefined = formData.get("task")?.toString();
    if (!task) {
      console.error("Please enter a task");
      return;
    }
    const newId = todos[todos.length - 1].id + 1;
    setTodos([...todos, { id: newId, title: task }]);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div>
        <form onSubmit={(event) => addNewTask(event)}>
          <Input name="task" type="text" placeholder="Add Your Task" />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="border-2 width-1/2">
            <span>{todo.title} </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
