// Importation des modules nécessaires pour la navigation, les états locaux, et les notifications
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Assurez-vous d'importer le CSS de Toastify
import styles from "./inscription.module.css";
import Logo from "../../assets/images/logo-prodcat-noir2.svg";
import Validation from "./InscriptionValidation";

// Pour récupérer les variables d'environnement à partir de .env
const URL = import.meta.env.VITE_API_URL;

// Définition du composant Inscription
export default function Inscription() {
  // Fonction pour afficher une notification de succès
  const notifySuccess = (text) => toast.success(text);
  // Fonction pour afficher une notification d'erreur
  const notifyError = (text) => toast.error(text);
  const navigate = useNavigate();

  // Initialisation de l'état local pour les valeurs du formulaire
  const [values, setValues] = useState({
    pseudo: "",
    email: "",
    password: "",
    role: "",
  });

  // Initialisation de l'état local pour les erreurs de validation
  const [errors, setErrors] = useState({});

  // Gestion de la mise à jour des valeurs du formulaire
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Gestion de la soumission du formulaire d'inscription
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation des champs du formulaire
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    //  Si aucune erreur de validation, envoyer les données au serveur
    //  headers: { "Content-Type": "application/json" }: Définit les headers de la requête. Ici, il spécifie que le corps de la requête est au format JSON
    //  body: JSON.stringify(values): Le corps de la requête contient les données à envoyer au serveur. values est un objet JavaScript contenant les données, et JSON.stringify(values) le convertit en chaîne JSON.

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
            role: values.role,
          }),
        });

        // Vérification de la réponse du serveur
        if (response.status === 200) {
          throw new Error("Erreur lors de l'inscription");
        }

        const userData = await response.json();

        // Vérifiez le rôle de l'utilisateur et redirigez en conséquence
        if (userData.role === "admin") {
          navigate("/admin");
          notifySuccess(`Bienvenue Maitre.sse`);
        } else {
          navigate("/connexion");
          notifySuccess(`Inscription réussie !`);
        }
      } catch (err) {
        notifyError("Une erreur est survenue lors de l'inscription");
      }
    } else {
      notifyError("Veuillez corriger les erreurs dans le formulaire");
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
                {errors.pseudo !== undefined && <span>{errors.pseudo}</span>}
              </p>
            </div>
            <label htmlFor="email" className={styles.rowFormRow}>
              <h4>Adresse mail</h4>
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
