import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Assurez-vous d'importer le CSS de Toastify
import { useUserContext } from "../../contexts/UserContext";
import styles from "./signin.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

export default function Signin() {
  const URL = import.meta.env.VITE_API_URL;
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  const navigate = useNavigate();
  const { login } = useUserContext();
  // État pour stocker les informations de connexion
  const [loginInfos, setLoginInfos] = useState({
    pseudo: "",
    password: "",
  });
  // Fonction pour mettre à jour les informations de connexion à chaque modification des champs
  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };
  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInfos.pseudo.trim() === "" || loginInfos.password.trim() === "") {
      notifyError("Pseudo et mot de passe doivent être renseignés");
      return;
    }

    try {
      const response = await fetch(`${URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfos),
      });

      if (response.status === 200) {
        const responseData = await response.json();

        if (responseData.user) {
          // Appel de la fonction login du contexte utilisateur
          login(responseData.user);

          if (loginInfos.pseudo === "admin") {
            // Redirection vers la page admin si l'utilisateur est un admin
            navigate("/admin");
            notifySuccess(`Bienvenue`);
          } else {
            navigate("/");
            notifySuccess(`Bienvenue ${loginInfos.pseudo}`);
          }
        } else {
          notifyError("Utilisateur.rice introuvable");
        }
      } else {
        notifyError("Identifiants invalides");
      }
    } catch (error) {
      notifyError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo prodkat" />
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
                  placeholder="Pseudo"
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
            <button type="submit">
              <p>Connexion</p>
            </button>
          </form>
          <div className={styles.textUnderButton}>
            <p className={styles.underButton}>
              Je suis un.e nouvel.le utilisateur.rice ?
              <Link to="/inscription"> Inscription</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
