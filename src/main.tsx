import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HomeRoute } from "@/routes/home.tsx";
import { AboutRoute } from "@/routes/about";
import { DetailTaskRoute } from "@/routes/detail-task";
import { LayoutRoute } from "@/routes/layout";
import { BoardContextProvider } from "@/context/BoardContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BoardContextProvider>
        <Routes>
          <Route element={<LayoutRoute />}>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/about" element={<AboutRoute />} />
            {/* TODO: <Route path="/tasks" element={<AllTasksRoute />} /> */}
            <Route path="/tasks/:taskId" element={<DetailTaskRoute />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Route>
        </Routes>
      </BoardContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
