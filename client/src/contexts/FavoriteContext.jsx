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

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  const { user } = useUserContext();
  const [favorites, setFavorites] = useState([]);

  const notifyError = (text) => toast.error(text); // Notification d'erreur ajoutée

  useEffect(() => {
    if (user) {
      try {
        const response = async () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/favorite/${user[0].id}`);
        if (response.status === 200) {
          const data = response.json();
          setFavorites(data);
        }
      } catch (error) {
        notifyError("Erreur lors de la récupération du favori :", error);
      }
    }
  }, [user]);

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
