import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signin from "./pages/SignIn/Signin";
import Inscription from "./pages/Inscription/Inscription";
import Profile from "./pages/Profile/Profile";
import Homepage from "./pages/Homepage/Homepage";
import VideoPage from "./pages/Videopage/Videopage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateFilm from "./pages/CreateFilm/CreateFilm";
import VerifyFreemiumUser from "./pages/Freemium/VerifyFreemiumUser";
import EditFilm from "./pages/AdminPage/EditFilm";
import Contact from "./pages/Contact/Contact";
import Received from "./pages/Contact/Received";

// URL de l'API, récupérée depuis les variables d'environnement
const URL = import.meta.env.VITE_API_URL;

// Configuration des routes de l'application
const router = createBrowserRouter([
  {
    path: "/", // Chemin de la route principale
    element: <App />, // Composant principal de l'application
    children: [
      {
        path: "/", // Route pour la page d'accueil
        element: <Homepage />, // Composant de la page d'accueil
        loader: async () => fetch(`${URL}/api/films`), // Chargement des données des films depuis l'API
      },
      {
        path: "/connexion", // Route pour la page de connexion
        element: <Signin />, // Composant de la page de connexion
      },
      {
        path: "/inscription", // Route pour la page d'inscription
        element: <Inscription />, // Composant de la page d'inscription
      },
      {
        path: "/profile", // Route pour la page de profil utilisateur
        element: <Profile />, // Composant de la page de profil
      },
      {
        path: "/bandeannonce/:id", // Route pour la page de bande-annonce d'un film, avec un paramètre dynamique `id`
        element: <VideoPage />, // Composant de la page de bande-annonce
        loader: async ({ params }) => fetch(`${URL}/api/films/${params.id}`), // Chargement des données du film spécifique depuis l'API
      },
      {
        path: "/bandeannonce/:id/edit", // Route pour l'édition d'un film, avec un paramètre dynamique `id`
        element: <EditFilm />, // Composant pour éditer les détails du film
      },
      {
        path: "/admin", // Route pour la page d'administration
        element: <AdminPage />, // Composant de la page d'administration
        loader: async () => fetch(`${URL}/api/films`), // Chargement des données des films depuis l'API pour l'administration
      },
      {
        path: "/creationpagefilm", // Route pour la création d'un nouveau film
        element: <CreateFilm />, // Composant de la page de création de film
      },
      {
        path: "/verifyfreemium", // Route pour la vérification d'un utilisateur freemium
        element: <VerifyFreemiumUser />, // Composant de la page de vérification freemium
      },
      {
        path: "/contact", // Route pour la page de contact
        element: <Contact />, // Composant de la page de contact
      },
      {
        path: "/received", // Route pour la page des messages reçus
        element: <Received />, // Composant de la page des messages reçus
      },
    ],
  },
]);

// Création et rendu de la racine de l'application React
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
    {/* Fournisseur de routage pour l'application */}
  </React.StrictMode>
);
