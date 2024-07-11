// src/pages/SignIn/Signin.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./signin.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useUserContext();
  const [loginInfos, setLoginInfos] = useState({
    pseudo: "",
    password: "",
  });

  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInfos.pseudo.trim() === "" || loginInfos.password.trim() === "") {
      console.error("Pseudo and password must be non-empty strings");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfos),
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.info("API response:", responseData);

        if (responseData.user) {
          login(responseData.user);

          if (loginInfos.pseudo === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          console.error("User object is missing in the response");
        }
      } else {
        console.info("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            <button type="submit">
              <h3>Connexion</h3>
            </button>
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
