import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./contact.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

const URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  // Initialisation de l'état local pour les valeurs du formulaire de contact
  const [values, setValues] = useState({
    request: "",
  });

  const navigate = useNavigate();
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  // Gestion de la mise à jour des valeurs du formulaire
  const handleInputContact = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Gestion de la soumission du formulaire de contact
  const handleContact = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/api/request`, {
        method: "POST", // Méthode HTTP POST pour envoyer les données
        headers: {
          "Content-Type": "application/json", // Définition du type de contenu pour l'en-tête HTTP
        },
        body: JSON.stringify({
          request: values.request, // Corps de la requête contenant la demande
        }),
      });

      // Vérification du statut de la réponse de l'API
      if (response.status > 200 || response.status < 300) {
        const data = await response.json(); // Conversion de la réponse en JSON
        navigate("/received");
        notifySuccess("Requête réussie :", data);
      }
    } catch (err) {
      notifyError("Erreur lors de la requête de contact:", err);
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
          <h2>Contactez nous</h2>
          <Form
            method="post"
            className={styles.contactForm}
            onSubmit={handleContact}
          >
            <label htmlFor="request" className={styles.rowFormRow}>
              <p className={styles.titleForm}>Une suggestion ?</p>
            </label>
            <div className={styles.requestInput}>
              <input
                type="text"
                placeholder="Un nouveau film à ajouter"
                name="request"
                value={values.request}
                onChange={handleInputContact}
              />
            </div>
            <button className={styles.buttonSubmit} type="submit">
              <p className={styles.inscriptionButton}>Envoyer</p>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
