import { App } from "@/app";
import { BoardContextProvider } from "@/context/BoardContext";

export function HomeRoute() {
  return (
    <>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </>
  );
}
