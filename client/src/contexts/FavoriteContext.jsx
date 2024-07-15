// src/contexts/FavoritesContext.js
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useUserContext } from "./UserContext";

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  const { user } = useUserContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite/${user[0].id}`
        );
        const data = await response.json();
        setFavorites(data);
      }
    };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (filmId) => {
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
      setFavorites((prevFavorites) => [...prevFavorites, { film_id: filmId }]);
    }
  };

  const removeFavorite = async (filmId) => {
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
    }
  };

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
