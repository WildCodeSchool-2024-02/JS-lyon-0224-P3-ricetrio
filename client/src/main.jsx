import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signin from "./pages/SignIn/Signin";
import Forget from "./pages/Forget/Forget";
import Inscription from "./pages/SignUp/Inscription";
import Homepage from "./pages/Homepage/Homepage";
import VideoPage from "./pages/Videopage/Videopage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => fetch(`${import.meta.env.VITE_API_URL}/api/films`),
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/forgotpassword",
        element: <Forget />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/videopage/:id",
        element: <VideoPage />,
        loader: async ({params}) => fetch(`${import.meta.env.VITE_API_URL}/api/films/${params.id}`),
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
