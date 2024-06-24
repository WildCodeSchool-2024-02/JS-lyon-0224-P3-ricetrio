import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Signin from "./pages/SignIn/Signin";
import Inscription from "./pages/SignUp/Inscription";
import Homepage from "./pages/Homepage/Homepage";
import VideoPage from "./pages/Videopage/Videopage";
import CreateFilm from "./pages/CreateFilm/CreateFilm";

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
        action: async ({ request }) => {
          try {
            const formData = await request.formData();

            const pseudo = formData.get("pseudo");
            const email = formData.get("email");
            const password = formData.get("password");
            const response = await fetch(`${URL}/api/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pseudo,
                email,
                password,
              }),
            });

            if (!response.ok) {
              throw new Error("");
            }
          } catch (err) {
            console.error("Fetch error:", err);
            return null;
          }
          return redirect("/");
        },
      },
      {
        path: "/bandeannonce/:id",
        element: <VideoPage />,
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/films/${params.id}`),
      },
      {
        path: "/creationpagefilm",
        element: <CreateFilm />,
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
