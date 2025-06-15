import { NavLink, Outlet } from "react-router";

export function LayoutRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between bg-gray-800 px-4 text-white">
        <NavLink to="/" className="text-lg font-bold">
          Kanban Board
        </NavLink>
        <nav className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "text-white"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="flex h-16 items-center justify-center bg-gray-800 text-white">
        <p>
          {new Date().getFullYear()}&copy; Rakhel Cakra K.Sera. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
