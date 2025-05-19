import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Chat from "./pages/Chat.jsx";
import Group from "./pages/Group.jsx";
import "../App.css";
import LoginSignUp from "./pages/Login-SignUp.jsx";
import { ProtectRoute } from "./Components/auth/ProtectRout.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path: "/Chat/:ChatId",
        element: <Chat />,
      },
      {
        path: "/Group",
        element: <Group />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/Login-SignUp",
    element: <LoginSignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ProtectRoute>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </ProtectRoute>
);
