import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
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

  const handleLogout = async () => {
    logout(false);
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 200);
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${ApiUrl}/user`, {
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
      console.error(err);
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
        const data = await responseFavorite.json();

        setUserData(data);
      } else if (responseFavorite.status === 401) {
        logout(true);
      }
    } catch (err) {
      console.error(err);
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
  }, []);

  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" />
        </Link>
      </div>

      <div className={styles.containerProfile}>
        <div className={styles.profile}>
          <div className={styles.myProfile}>
            <img src={Avatar} alt="Avatar Kat" className={styles.avatar} />
            <div className={styles.informations}>
              <p className={styles.pseudo}>Urssafito</p>
              <p className={styles.mail}>chat@tropmignon.fr</p>
            </div>
          </div>

          <div className={styles.favorite}>
            <p>Mes favoris</p>
            <div className={styles.favoritesList}>
              {favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <div key={favorite.film_id} className={styles.favoriteItem}>
                    <Link to={`/bandeannonce/${favorite.film_id}`}>
                      <p>{favorite.film_id}</p>
                      <img
                        src={favorite.poster_link}
                        alt={favorite.title}
                        className={styles.favoriteImage}
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <p>No favorite films found.</p>
              )}
            </div>
          </div>

          <div className={styles.button}>
            {userData}
            <Link to="/">
              <button
                type="button"
                className={`nes-btn is-red ${styles.logout_btn}`}
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
