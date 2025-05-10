import { useState } from "react";

export function App() {
  const [inputValue, setInputValue] = useState("");
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

  function addNewTask() {
    const newId = todos[todos.length - 1].id + 1;
    setTodos([...todos, { id: newId, title: inputValue }]);
  }

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id != id);
    console.log(newTodos);
    setTodos(newTodos);
  }

  console.log({ todos });

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          placeholder="Add your task"
        />
        <div>
          <button onClick={addNewTask}>Submit</button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
