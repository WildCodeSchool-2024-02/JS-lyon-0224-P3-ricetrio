import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./signin.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";

export default function Signin() {
  const { setAuth } = useOutletContext();
  const [loginInfos, setLoginInfos] = useState({
    pseudo: "",
    password: "",
  });

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginInfos.pseudo || !loginInfos.password) {
      console.error("Pseudo and password must be non-empty strings");
      return;
    }
    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfos),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const auth = await response.json();

        setAuth(auth);
        console.info("Token received and set:", auth);
        navigate("/");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

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
          <form onSubmit={handleLogin} className={styles.contactForm}>
            <div className={styles.rowFormRow}>
              <h4>Pseudo</h4>
              <div className={styles.pseudoInput}>
                <input
                  className={styles.textInput}
                  type="text"
                  placeholder="Michael J."
                  name="pseudo"
                  value={loginInfos.pseudo}
                  onChange={handleLoginInfos}
                />
              </div>
            </div>
            <div className={styles.rowFormRow}>
              <h4>Mot de passe</h4>
              <div className={styles.pseudoInput}>
                <input
                  value={loginInfos.password}
                  type="password"
                  name="password"
                  placeholder="●●●●●●●●"
                  onChange={handleLoginInfos}
                />
              </div>
            </div>

            <Link to="/profile">
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
