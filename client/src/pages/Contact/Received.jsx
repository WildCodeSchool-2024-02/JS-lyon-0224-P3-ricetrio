import { Link } from "react-router-dom";
import styles from "./received.module.css";
import Logo from "../../assets/images/logo-prodcat-noir.svg";

export default function Received() {
  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo prodkat" />
        </Link>
      </div>
      <div className={styles.receivedContainer}>
        <p>Nous avons reçu votre demande, merci!</p>
        <Link to="/">
          <p>Retour à l'accueil</p>
        </Link>
      </div>
    </div>
  );
}
