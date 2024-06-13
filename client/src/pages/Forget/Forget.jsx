import { Link } from "react-router-dom";
import styles from "./forget.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";

export default function Forget() {
  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" />
        </Link>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactBloc}>
          <h2>Forget Password</h2>
          <form className={styles.contactForm}>
            <div className={styles.rowFormRow}>
              <h4>Email Address</h4>
              <div className={styles.pseudoInput}>
                <input type="text" placeholder="mikael.jackson@gmail.com" />
              </div>
            </div>
            <Link to="/">
              <button type="submit">
                <h3>Send</h3>
              </button>
            </Link>
          </form>
          <div className={styles.textUnderButton}>
            <p className={styles.underButton}>
              I'm new user. <Link to="/inscription">Sign Up</Link>
            </p>
            <p className={styles.underButton}>
              Already have an account. <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
