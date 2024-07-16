import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";
import styles from "./profile.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";
import Avatar from "../../assets/images/avatar.png";

function Profile() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

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

  useEffect(() => {
    if (user !== "null" || user !== null) {
      getProfile();
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
            <p className={styles.titleFav}>Mes favoris</p>
            {/* <p>{allFavorite.title}</p> */}
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
