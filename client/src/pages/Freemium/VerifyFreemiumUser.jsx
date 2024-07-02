import { Link } from "react-router-dom";
import styles from "./verifyfreemiumuser.module.css";
import NavBar from "../../components/Navbar/Navbar";

function VerifyFreemiumUser() {
  return (
    <div>
      <NavBar />
      <div className={styles.verifyContainer}>
        <h4>Continuer à regarder les vidéos Freemium</h4>
        <div className={styles.verifyTextContainer}>
          <h3>
            Déjà un compte?
            <Link to="/connexion">
              <button type="button">
                <h3>Se connecter</h3>
              </button>
            </Link>
          </h3>
        </div>
        <div className={styles.verifyTextContainer}>
          <h3>
            Nouvel utilisateur ?
            <Link to="/inscription">
              <button type="button">
                <h3>S'inscrire</h3>
              </button>
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default VerifyFreemiumUser;
