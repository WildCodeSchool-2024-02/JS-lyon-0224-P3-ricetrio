// "toast" est une bibiliothéque pour affichier des notifications
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
// Un hook personnalisé pour accéder au contexte utilisateur
import { useUserContext } from "./UserContext";

const FavoritesContext = createContext();

// Un hook personnalisé
export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  // L'utilisateur actuel obtenu du contexte utilisateur.
  const { user } = useUserContext();
  // L'état et le setter pour les favoris.
  const [favorites, setFavorites] = useState([]);
  // Notification d'erreur ajoutée
  const notifyError = (text) => toast.error(text);

  // Un hook qui exécute du code lorsque user change
  useEffect(() => {
    const fetchFavorites = async () => {
      // Ce fetch est utilisé pour récupérer la liste des favoris de l'utilisateur depuis l'API lorsque le composant est monté ou lorsque user change
      if (user) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/favorite/${user[0].id}`
          );
          // Si "response" est 200, les favoris sont mise à jour
          if (response.ok) {
            const data = await response.json();
            setFavorites(data);
          } else {
            notifyError("Échec de la demande de favori");
          }
        } catch (error) {
          notifyError("Erreur lors de la récupération des favoris :", error);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  // Une fonction pour ajouter un film aux favoris
  const addFavorite = useCallback(
    async (filmId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Une requête POST avec l'ID de l'utilisateur et l'ID du film
            body: JSON.stringify({ userId: user[0].id, filmId }),
          }
        );

        if (response.ok) {
          setFavorites((prevFavorites) => [
            ...prevFavorites,
            { film_id: filmId },
          ]);
        } else {
          notifyError("Échec lors de l'ajout du favori");
        }
      } catch (error) {
        notifyError("Erreur lors de l'ajout du favori", error);
      }
    },
    [user]
  );

  // Une fonction pour supprimer un film des favoris.
  const removeFavorite = useCallback(
    async (filmId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            // Une requête POST avec l'ID de l'utilisateur et l'ID du film
            body: JSON.stringify({ userId: user[0].id, filmId }),
          }
        );

        if (response.ok) {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.film_id !== filmId)
          );
        } else {
          notifyError("Échec lors de la suppression du favori");
        }
      } catch (error) {
        notifyError("Erreur lors de la suppression du favori", error);
      }
    },
    [user]
  );

  // Utilise useMemo pour mémoriser les valeurs du contexte (favoris, ajout et suppression de favoris) afin d'optimiser les performances
  //  le contexte (addFavorite, removeFavorite) conservent la même référence tant que leurs dépendances ne changent pas
  // Pour eviter des recalculs inutiles
  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
    }),
    [favorites, addFavorite, removeFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
