import { Link } from "react-router-dom";
import styles from "./verifyfreemiumuser.module.css";
import NavBar from "../../components/Navbar/Navbar";

function VerifyFreemiumUser() {
  return (
    <div>
      <NavBar />
      <div className={styles.verifyContainer}>
        <p>Continuer à regarder les vidéos Freemium</p>
        <div className={styles.verifyTextContainer}>
          <p>
            Déjà un compte?
            <Link to="/connexion">
              <button type="button">
                <p>Se connecter</p>
              </button>
            </Link>
          </p>
        </div>
        <div className={styles.verifyTextContainer}>
          <p>
            Nouvel.le utilisateur.rice ?
            <Link to="/inscription">
              <button type="button">
                <p>S'inscrire</p>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyFreemiumUser;
