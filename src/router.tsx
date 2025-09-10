import { createBrowserRouter } from "react-router-dom"
import { Help } from "@/pages/Help.tsx"
import { Todo } from "@/pages/Todo.tsx"
import { Dashboard } from "@/pages/Dashboard.tsx"
import { Settings } from "@/pages/Settings.tsx"
import App from "./App.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/todos",
    element: <Todo />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/help",
    element: <Help />,
  },
])
