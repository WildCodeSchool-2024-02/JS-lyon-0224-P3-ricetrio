import { Link } from "react-router-dom";
import styles from "./profile.module.css";
import Logo from "../../assets/images/logo-prodkat.svg";
import Avatar from "../../assets/images/avatar.png";

function Profile() {
  return (
    <div>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" />
        </Link>
      </div>

      <div className={styles.containerProfile}>
        <div className={styles.profile}>
          <div className={styles.myProfile}>
            <img src={Avatar} alt="Avatar Kat" className={styles.avatar} />
            <div className={styles.informations}>
              <p className={styles.pseudo}>Urssafito</p>
              <p className={styles.mail}>chat@tropmignon.fr</p>
            </div>
          </div>
          <div className={styles.button}>
            <Link to="/">
              <button type="submit">
                <h3>Me déconnecter</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
