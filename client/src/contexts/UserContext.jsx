import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import "react-toastify/dist/ReactToastify.css";

// Création du contexte pour l'utilisateur
const UserContext = createContext();

// Fournisseur de contexte pour l'utilisateur
export default function UserProvider({ children }) {
  const ApiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // Hook personnalisé pour stocker l'utilisateur dans le localStorage
  const [user, setUser] = useLocalStorage("user", "");

  // Fonction pour afficher des notifications d'erreur
  const notifyError = (text) => toast.error(text);

  // Fonction pour connecter un utilisateur
  const login = (userData) => {
    setUser(userData);
  };

  // Fonction pour déconnecter un utilisateur
  const logout = async (sessionExpired) => {
    try {
      // Requête pour se déconnecter
      const response = await fetch(`${ApiUrl}/user/logout`, {
        credentials: "include", // Inclure les cookies avec la requête
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Réinitialisation de l'état utilisateur et navigation vers la page de connexion ou d'accueil
        setUser(null);
        navigate(sessionExpired === true ? "/connexion" : "/");
      }
    } catch (err) {
      // Notification en cas d'erreur lors de la déconnexion
      notifyError(err);
    }
  };

  // Memoization du contexte pour éviter les re-rendus inutiles
  const memo = useMemo(
    () => ({ user, setUser, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user] // La valeur du contexte est recalculée lorsque `user` change
  );

  // Fourniture du contexte aux composants enfants
  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

// Définition des types des props pour le composant UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour accéder au contexte utilisateur dans les composants enfants
export const useUserContext = () => useContext(UserContext);
