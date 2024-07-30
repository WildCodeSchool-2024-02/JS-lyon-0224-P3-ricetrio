import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";
import styles from "./profile.module.css";
import Avatar from "../../assets/images/avatar.png";
import { useFavoritesContext } from "../../contexts/FavoriteContext";
import NavBar from "../../components/Navbar/Navbar";

// Définition du composant Inscription
function Profile() {
  // URL de l'API, récupérée depuis les variables d'environnement de .env
  const URL = import.meta.env.VITE_API_URL;
  // État pour les données utilisateur
  const [userData, setUserData] = useState(null);
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();
  // Utilisation du contexte utilisateur
  const { user, logout } = useUserContext();
  // Utilisation du contexte des favoris
  const { favorites } = useFavoritesContext();
  // Fonction pour afficher les notifications d'erreur
  const notifyError = (text) => toast.error(text);

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = async () => {
    // Appel de la fonction de déconnexion du contexte utilisateur
    logout(false);
    localStorage.removeItem("user");
    setTimeout(() => {
      // Redirection vers la page d'accueil
      navigate("/");
      // Rechargement de la page
      window.location.reload();
    }, 1000);
    // Notification de déconnexion réussie
    toast.info("Déconnexion réussie !");
  };

  // Fonction pour récupérer les informations du profil utilisateur
  const getProfile = async () => {
    try {
      const response = await fetch(`${URL}/api/users`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // Mise à jour de l'état avec les données utilisateur
        setUserData(data);
      } else if (response.status === 401) {
        // Déconnexion si l'utilisateur n'est pas autorisé
        logout(true);
      }
    } catch (err) {
      // Notification en cas d'erreur
      notifyError("Erreur lors de la récupération du profile", err);
    }
  };

  // Fonction pour récupérer les films favoris de l'utilisateur
  const getFavorite = async () => {
    try {
      const responseFavorite = await fetch(`${URL}/api/favorite`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responseFavorite.status === 200) {
        const favoriteData = await responseFavorite.json();
        // Mise à jour de l'état avec les films favoris
        setUserData(favoriteData);
      } else if (responseFavorite.status === 401) {
        // Déconnexion si l'utilisateur n'est
        logout(true);
      }
    } catch (err) {
      notifyError("Erreur lors de la récupération des favoris", err);
    }
  };

  useEffect(() => {
    if (user !== "null" || user !== null) {
      getProfile();
      getFavorite();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <NavBar />

      <div className={styles.containerProfile}>
        <div className={styles.profile}>
          <div className={styles.myProfile}>
            <img src={Avatar} alt="Avatar Kat" className={styles.avatar} />
            <div className={styles.informations}>
              {user ? (
                <div>
                  <p className={styles.pseudo}>{user[0].pseudo}</p>
                  <p className={styles.mail}>{user[0].email}</p>
                </div>
              ) : (
                <p>Utilisateur.rice introuvable</p>
              )}
            </div>
          </div>

          <div className={styles.favorite}>
            <p className={styles.titleFavorite}>MES FAVORIS</p>
            <div className={styles.favoritesList}>
              {favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <div key={favorite.film_id} className={styles.favoriteItem}>
                    <div className={styles.favoriteBloc}>
                      <Link to={`/bandeannonce/${favorite.id}`}>
                        <p className={styles.titleFav}>{favorite.title}</p>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucun favori trouvé</p>
              )}
            </div>
          </div>

          <div className={styles.button}>
            {userData}
            <Link to="/">
              <button
                type="submit"
                className={`buttonLogout ${styles.logout_btn}`}
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
