import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signin from "./pages/SignIn/Signin";
import Inscription from "./pages/SignUp/Inscription";
import Homepage from "./pages/Homepage/Homepage";
import VideoPage from "./pages/Videopage/Videopage";
import AdminPage from "./pages/AdminPage/AdminPage";

const URL = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => fetch(`${URL}/api/films`),
      },
      {
        path: "/connexion",
        element: <Signin />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/bandeannonce/:id",
        element: <VideoPage />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/films/${params.id}`),
      },
      {
        path: "/admin",
        element: <AdminPage />,
        loader: async () => fetch(`${URL}/api/films`),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
