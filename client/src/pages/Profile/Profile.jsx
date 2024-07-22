import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";
import styles from "./profile.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";
import Avatar from "../../assets/images/avatar.png";
import { useFavoritesContext } from "../../contexts/FavoriteContext";

function Profile() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const { favorites } = useFavoritesContext();
  const notifyError = (text) => toast.error(text);

  const handleLogout = async () => {
    logout(false);
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
    toast.info("Déconnexion réussie !");
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${ApiUrl}/users`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        setUserData(data);
      } else if (response.status === 401) {
        logout(true);
      }
    } catch (err) {
      notifyError("Erreur lors de la récupération du profile", err);
    }
  };

  const getFavorite = async () => {
    try {
      const responseFavorite = await fetch(`${ApiUrl}/favorite`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (responseFavorite.status === 200) {
        const favoriteData = await responseFavorite.json();

        setUserData(favoriteData);
      } else if (responseFavorite.status === 401) {
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
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo prodkat" />
        </Link>
      </div>

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
            <p className={styles.titleFav}>Mes favoris</p>
            <div className={styles.favoritesList}>
              {favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <div key={favorite.film_id} className={styles.favoriteItem}>
                    <Link to={`/bandeannonce/${favorite.id}`}>
                      <p className={styles.titleFav}>{favorite.title}</p>
                    </Link>
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
                className={`button ${styles.logout_btn}`}
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
