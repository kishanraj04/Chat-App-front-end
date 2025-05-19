import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Chat from "./pages/Chat.jsx";
import Group from "./pages/Group.jsx";
import LoginSignUp from "./pages/Login-SignUp.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/Chat/:ChatId',
    element:<Chat/>
  },
  {
    path:'/Group',
    element:<Group/>
  },
  {
    path:'/Login-SignUp',
    element:<LoginSignUp/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes}>
    <App />
  </RouterProvider>
);
