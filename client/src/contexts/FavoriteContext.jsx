import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useUserContext } from "./UserContext";

// Création du contexte pour les favoris
const FavoritesContext = createContext();

// Hook personnalisé pour accéder au contexte des favoris
export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  // Obtention des informations sur l'utilisateur depuis le contexte utilisateur
  const { user } = useUserContext();

  // État local pour stocker les films favoris de l'utilisateur
  const [favorites, setFavorites] = useState([]);

  // Fonction pour afficher une notification d'erreur
  const notifyError = (text) => toast.error(text);

  // Effet pour récupérer les favoris de l'utilisateur lorsqu'il est connecté
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          // Requête pour obtenir les favoris de l'utilisateur depuis l'API
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/favorite/${user[0].id}`
          );
          if (response.status === 200) {
            const data = await response.json();
            setFavorites(data); // Mise à jour de l'état avec les favoris obtenus
          }
        } catch (error) {
          // Notification en cas d'erreur lors de la récupération des favoris
          notifyError("Erreur lors de la récupération des favoris :", error);
        }
      }
    };
    fetchFavorites();
  }, [user]); // Dépendance sur `user` pour recharger les favoris si l'utilisateur change

  // Fonction pour ajouter un film aux favoris
  const addFavorite = useCallback(
    async (filmId) => {
      try {
        // Requête pour ajouter un film aux favoris via l'API
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user[0].id, filmId }),
          }
        );

        if (response.status === 200) {
          // Mise à jour de l'état avec le nouveau film ajouté aux favoris
          setFavorites((prevFavorites) => [
            ...prevFavorites,
            { film_id: filmId },
          ]);
        }
      } catch (error) {
        // Notification en cas d'erreur lors de l'ajout d'un film aux favoris
        notifyError(
          "Veuillez vous connecter pour ajouter des films en favoris",
          error
        );
      }
    },
    [user] // Dépendance sur `user` pour garantir que l'ID utilisateur est disponible
  );

  // Fonction pour retirer un film des favoris
  const removeFavorite = useCallback(
    async (filmId) => {
      try {
        // Requête pour retirer un film des favoris via l'API
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user[0].id, filmId }),
          }
        );

        if (response.status === 200) {
          // Mise à jour de l'état en retirant le film supprimé des favoris
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.film_id !== filmId)
          );
        }
      } catch (error) {
        // Notification en cas d'erreur lors de la suppression d'un film des favoris
        notifyError("Erreur lors de la suppression du favori", error);
      }
    },
    [user] // Dépendance sur `user` pour garantir que l'ID utilisateur est disponible
  );

  // Memoization du contexte pour éviter les re-rendus inutiles
  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
    }),
    [favorites, addFavorite, removeFavorite]
  );

  // Fourniture du contexte aux composants enfants
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Définition des types des props pour le composant FavoritesProvider
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
