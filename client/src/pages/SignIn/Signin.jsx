import { Link } from "react-router-dom";
import styles from "./signin.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";

export default function Signin() {
  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" />
        </Link>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactBloc}>
          <h2>Connexion</h2>
          <form className={styles.contactForm}>
            <div className={styles.rowDormRow}>
              <h4>Pseudo</h4>
              <div className={styles.pseudoInput}>
                <input
                  className={styles.textInput}
                  type="text"
                  placeholder="Michael J."
                />
              </div>
            </div>
            <div className={styles.rowFormRow}>
              <h4>Mot de passe</h4>
              <div className={styles.pseudoInput}>
                <input type="password" placeholder="●●●●●●●●" />
              </div>
            </div>
            <Link to="/">
              <button type="submit">
                <h3>Connexion</h3>
              </button>
            </Link>
          </form>
          <div className={styles.textUnderButton}>
            <p className={styles.underButton}>
              Je suis un·e nouvel·le utilisateur·rice ?{" "}
              <Link to="/inscription">Inscription</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
