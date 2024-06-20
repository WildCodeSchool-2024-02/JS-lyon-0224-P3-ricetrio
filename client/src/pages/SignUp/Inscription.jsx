import { Form, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./inscription.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";
import Validation from "./InscriptionValidation";

export default function Inscription() {
  const [values, setValues] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    event.preventDefault();
    setErrors(Validation(values));
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
          <h2>Sign Up</h2>
          <Form method="post" className={styles.contactForm}>
            <label htmlFor="text" className={styles.rowFormRow}>
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
              <h4>Email Address</h4>
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
            <label htmlFor="text" className={styles.rowFormRow}>
              <h4>Password</h4>
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
              <h3>Sign Up</h3>
            </button>
          </Form>

          <div className={styles.textUnderButton}>
            <p className={styles.underButton}>
              Already have an account. <Link to="/signin">Sign In</Link>
            </p>
            <p className={styles.underButton}>
              I forgot my password. <Link to="/forgotpassword">Help</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
