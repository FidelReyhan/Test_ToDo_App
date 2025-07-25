import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorScreen from "./components/screen/ErrorScreen";
import LoginScreen from "./components/screen/LoginScreen";
import RegisterScreen from "./components/screen/RegisterScreen";
import TodoScreen from "./components/screen/TodoScreen";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        element: <TodoScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
