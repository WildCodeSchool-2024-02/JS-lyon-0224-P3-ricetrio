import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signin from "./pages/SignIn/Signin";
import Inscription from "./pages/SignUp/Inscription";
import Profile from "./pages/Profile/Profile";
import Homepage from "./pages/Homepage/Homepage";
import VideoPage from "./pages/Videopage/Videopage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateFilm from "./pages/CreateFilm/CreateFilm";
import VerifyFreemiumUser from "./pages/Freemium/VerifyFreemiumUser";
import EditFilm from "./pages/AdminPage/EditFilm";
import Contact from "./pages/Contact/Contact";
import Received from "./pages/Contact/Received";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/bandeannonce/:id",
        element: <VideoPage />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/films/${params.id}`),
      },
      {
        path: "/bandeannonce/:id/edit",
        element: <EditFilm />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        loader: async () => fetch(`${URL}/api/films`),
      },
      {
        path: "/creationpagefilm",
        element: <CreateFilm />,
      },
      {
        path: "/verifyfreemium",
        element: <VerifyFreemiumUser />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/received",
        element: <Received />,
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
