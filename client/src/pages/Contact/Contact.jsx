import { Form, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./contact.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

export default function Contact() {
  const [values, setValues] = useState({
    request: "",
  });

  const handleInputContact = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleContact = async (event) => {
    event.preventDefault();
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     const validationErrors = Validation(values);
  //     setErrors(validationErrors);

  //     if (Object.keys(validationErrors).length === 0) {
  //       try {
  //         const response = await fetch(`${URL}/api/users`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             pseudo: values.pseudo,
  //             email: values.email,

  //             message: values.message,
  //           }),
  //         });
  //     }catch{
  //       console.info("error")
  //     }
  //   };
  // }

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
              <p className={styles.titleForm}> request</p>
            </label>
            <div className={styles.requestInput}>
              <input
                type="text"
                placeholder="ecrivez votre requête de film "
                name="request"
                value={values.request}
                onChange={handleInputContact}
              />
              <p className={styles.errorsField}>
                {/* {errors.me !== undefined && <span>{errors.message}</span>} */}
              </p>
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
