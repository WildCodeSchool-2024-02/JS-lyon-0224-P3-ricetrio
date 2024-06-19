import { Link } from "react-router-dom";
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
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
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
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label htmlFor="text" className={styles.rowFormRow}>
              <h4>Pseudo</h4>
            </label>
            <div className={styles.pseudoInput}>
              <input
                className={styles.textInput}
                type="text"
                placeholder="Ton pseudo"
                name="pseudo"
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.pseudo && <span>{errors.pseudo}</span>}
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
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.email && <span>{errors.email}</span>}
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
                onChange={handleInput}
              />
              <p className={styles.errorsField}>
                {errors.password && <span>{errors.password}</span>}
              </p>
            </div>

            <button className={styles.buttonSubmit} type="submit">
              <h3>Sign Up</h3>
            </button>
          </form>

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
