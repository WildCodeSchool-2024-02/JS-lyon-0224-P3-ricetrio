import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./inscription.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";
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
    setErrors(Validation(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

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
        if (response.status === 200) {
          throw new Error("Erreur lors de l'inscription");
        }

        navigate("/admin");
      } catch (err) {
        console.error("Erreur lors de la requête d'inscription:", err);
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
              <p className={styles.titleForm}>Pseudo</p>
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
                {errors.pseudo !== undefined && <span>{errors.pseudo}</span>}
              </p>
            </div>
            <label htmlFor="email" className={styles.rowFormRow}>
              <p className={styles.titleForm}>Adresse email</p>
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
                {errors.email !== undefined && <span>{errors.email}</span>}
              </p>
            </div>
            <label htmlFor="password" className={styles.rowFormRow}>
              <p className={styles.titleForm}>Mot de passe</p>
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
                {errors.password !== undefined && (
                  <span>{errors.password}</span>
                )}
              </p>
            </div>

            <button className={styles.buttonSubmit} type="submit">
              <p className={styles.inscriptionButton}>Inscription</p>
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
