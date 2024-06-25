import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./inscription.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";
import Validation from "./InscriptionValidation";

const URL = import.meta.env.VITE_API_URL;

export default function Inscription() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors(Validation(values)); // Valider les champs à chaque changement
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut

    // Valider une dernière fois avant la soumission
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Vérifier s'il y a des erreurs avant de continuer
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: values.pseudo,
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        // Redirection vers la page d'accueil après inscription réussie
        navigate("/admin"); // Utilisation de navigate pour la redirection
      } catch (err) {
        console.error("Erreur lors de la requête d'inscription:", err);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
      }
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
          <h2>Inscription</h2>
          <Form
            method="post"
            className={styles.contactForm}
            onSubmit={handleSubmit}
          >
            <label htmlFor="pseudo" className={styles.rowFormRow}>
              <h4>Pseudo</h4>
            </label>
            <div className={styles.pseudoInput}>
              <input
                className={styles.textInput}
                type="text"
                placeholder="Ton pseudo"
                name="pseudo"
                value={values.pseudo}
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.pseudo && <span>{errors.pseudo}</span>}
              </p>
            </div>
            <label htmlFor="email" className={styles.rowFormRow}>
              <h4>Adresse email</h4>
            </label>
            <div className={styles.pseudoInput}>
              <input
                type="email"
                placeholder="ton.mail@gmail.com"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.email && <span>{errors.email}</span>}
              </p>
            </div>
            <label htmlFor="password" className={styles.rowFormRow}>
              <h4>Mot de passe</h4>
            </label>
            <div className={styles.pseudoInput}>
              <input
                type="password"
                placeholder="●●●●●●●●"
                name="password"
                value={values.password}
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.password && <span>{errors.password}</span>}
              </p>
            </div>

            <button className={styles.buttonSubmit} type="submit">
              <h3>Inscription</h3>
            </button>
          </Form>

          <div className={styles.textUnderButton}>
            <p className={styles.underButton}>
              J'ai déjà un compte. <Link to="/connexion">Connexion</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
