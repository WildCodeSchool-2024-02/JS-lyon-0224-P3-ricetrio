import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./contact.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

const URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [values, setValues] = useState({
    request: "",
  });
  const navigate = useNavigate();

  const handleInputContact = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleContact = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/api/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request: values.request,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      navigate("/received");
      console.info("Request successful:", data);
    } catch (err) {
      console.error("Erreur lors de la requête de contact:", err);
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
