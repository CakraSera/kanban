import { Tasks } from "@/data";
import type { Column, Task } from "@/types";
import {
  setItemLocalStorage,
  getItemLocalStorage,
} from "@/utils/local-storage";
import { createContext, useEffect, useReducer, useContext } from "react";
import type { Dispatch } from "react";

type BoardContextState = {
  tasks: Task[];
  columns: Column[];
};

type BoardContextAction =
  | { type: "ADD_TASK"; payload: Task }
  | {
      type: "EDIT_TASK";
      payload: { id: string; title: string };
    }
  | {
      type: "TOGGLE_TASK_COMPLETION";
      payload: { id: string; completed: boolean };
    }
  | {
      type: "DELETE_TASK";
      payload: string;
    }
  | {
      type: "DRAG_TASK";
      payload: { id: string; status: Task["status"] };
    };

function kanbanReducer(
  state: BoardContextState,
  action: BoardContextAction,
): BoardContextState {
  switch (action.type) {
    case "ADD_TASK": {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case "EDIT_TASK": {
      const updatedTasks = state.tasks.map((task: Task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task,
      );
      return { ...state, tasks: updatedTasks };
    }
    case "TOGGLE_TASK_COMPLETION": {
      const updatedTasks = state.tasks.map((task: Task) =>
        task.id === action.payload.id
          ? {
              ...task,
              completed: action.payload.completed,
              status: action.payload.completed ? "DONE" : task.status,
            }
          : task,
      );
      return { ...state, tasks: updatedTasks };
    }
    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter(
        (task: Task) => task.id !== action.payload,
      );
      return { ...state, tasks: updatedTasks };
    }
    case "DRAG_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task.id === action.payload.id
            ? { ...task, status: action.payload.status }
            : task,
        ),
      };
    }
    default:
      return state;
  }
}

type BoardContextType = {
  state: BoardContextState;
  dispatch: Dispatch<BoardContextAction>;
};

const BoardContext = createContext<BoardContextType | null>(null);

export function BoardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState: BoardContextState = {
    tasks: (() => {
      const tasks = getItemLocalStorage("tasks");
      if (!tasks) return Tasks;
      try {
        return tasks;
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        return Tasks;
      }
    })(),
    columns: [
      { slug: "TODO", name: "Todo" },
      { slug: "IN_PROGRESS", name: "In Progress" },
      { slug: "DONE", name: "Done" },
    ],
  };

  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  useEffect(() => {
    setItemLocalStorage("tasks", state.tasks);
  }, [state.tasks]);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error(
      "useBoardContext must be used within a BoardContextProvider",
    );
  }
  return context;
}
