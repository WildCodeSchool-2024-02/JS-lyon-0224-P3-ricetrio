import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-prodcat-noir.svg";
import Signin from "../../assets/images/Signin-blue.svg";
import styles from "./Navbar.module.css";
import { useUserContext } from "../../contexts/UserContext";

function NavBar() {
  const { user } = useUserContext();

  return (
    <div className={styles.containParents}>
      <div className={styles.containLeft}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.containRight}>
        {user[0].role !== "user" ? (
          <Link to="/connexion">
            <img
              src={Signin}
              alt="profile connexion ou inscription"
              className={styles.profile}
            />
          </Link>
        ) : (
          <Link to="/profile">
            <img
              src={Signin}
              alt="profile connexion ou inscription"
              className={styles.profile}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
