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
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import store from "./store/mystore.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignUp />,
  },
  ,
  {
    path: "/home",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/home/Chat/:ChatId", element: <Chat /> },
      { path: "/home/Group", element: <Group /> },
    ],
  },
  {
    path: "/about",
    element: <About />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <Provider store={store}>
        <ProtectRoute>
          <RouterProvider router={routes} />
        </ProtectRoute>
      </Provider>
    </GlobalContextProvider>
      <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
);
