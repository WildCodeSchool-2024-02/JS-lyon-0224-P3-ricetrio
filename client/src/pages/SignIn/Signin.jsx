import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useRef } from "react";
import styles from "./signin.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";

export default function Signin() {
  const pseudRef = useRef();
  const passwordRef = useRef();

  const { setAuth } = useOutletContext();

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pseud: pseudRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const auth = await response.json();

        setAuth(auth);

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
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.rowDormRow}>
              <h4>Pseudo</h4>
              <div className={styles.pseudoInput}>
                <input
                  className={styles.textInput}
                  type="text"
                  placeholder="Michael J."
                  ref={pseudRef}
                />
              </div>
            </div>
            <div className={styles.rowFormRow}>
              <h4>Mot de passe</h4>
              <div className={styles.pseudoInput}>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="●●●●●●●●"
                />
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
