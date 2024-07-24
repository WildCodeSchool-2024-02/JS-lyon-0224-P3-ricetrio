import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Logo from "../../assets/images/logo-prodcat-noir.svg";
import Contact from "../../assets/images/message.svg";
import Signin from "../../assets/images/login2.svg";
import styles from "./Navbar.module.css";

// Définition du composant NavBar
function NavBar() {
  // Récupération de l'utilisateur depuis le contexte
  const { user } = useUserContext();

  return (
    <div className={styles.containParents}>
      <div className={styles.containLeft}>
        <Link to="/">
          <img src={Logo} alt="Logo prodkat" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.containRight}>
        {/* Vérification si l'utilisateur est connecté */}
        {user === "" ? (
          // Si l'utilisateur n'est pas connecté, afficher l'icône de connexion
          <Link to="/connexion">
            <img
              src={Signin}
              alt="Profile connexion ou inscription"
              className={styles.profile}
            />
          </Link>
        ) : (
          // Si l'utilisateur est connecté, afficher l'icône de profil
          <Link to="/profile">
            <img
              src={Signin}
              alt="Profile connexion ou inscription"
              className={styles.profile}
            />
          </Link>
        )}
        <Link to="/contact">
          <img
            src={Contact}
            alt="Lien pour nous contacter"
            className={styles.profile}
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
