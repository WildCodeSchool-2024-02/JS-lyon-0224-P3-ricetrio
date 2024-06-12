import { Link } from "react-router-dom";
import styles from "./inscription.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";

export default function Inscription() {
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
          <form className={styles.contactForm}>
            <div className={styles.rowFormRow}>
              <h4>Pseudo</h4>
              <div className={styles.pseudoInput}>
                <input
                  className={styles.textInput}
                  type="text"
                  placeholder="Michael J."
                />
              </div>
            </div>
            <div className={styles.rowFormRow}>
              <h4>Email Address</h4>
              <div className={styles.pseudoInput}>
                <input type="text" placeholder="mikael.jackson@gmail.com" />
              </div>
            </div>
            <div className={styles.rowFormRow}>
              <h4>Password</h4>
              <div className={styles.pseudoInput}>
                <input type="password" placeholder="●●●●●●●●" />
              </div>
            </div>
            <Link to="/">
              <button className={styles.buttonSubmit} type="submit">
                <h3>Sign Up</h3>
              </button>
            </Link>
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
