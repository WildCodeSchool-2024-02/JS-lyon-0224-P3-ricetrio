import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-prodkat.svg";
import Search from "../../assets/images/Search.svg";
import Signin from "../../assets/images/Signin.svg";
import styles from "./Navbar.module.css";

function NavBar() {
  return (
    <div className={styles.containParents}>
      <div className={styles.containLeft}>
        <Link to="/">
          <img src={Logo} alt="logo prodkat" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.containRight}>
        <img
          src={Search}
          alt="search with the magnifying glass"
          className={styles.search}
        />
        <Link to="/signin">
          <img
            src={Signin}
            alt="profil for signin or signup"
            className={styles.profile}
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
