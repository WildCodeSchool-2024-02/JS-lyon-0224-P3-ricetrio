import Logo from "../../assets/images/logo-prodkat.svg";
import Search from "../../assets/images/Search.svg";
import Signin from "../../assets/images/Signin.svg";
import styles from "./Navbar.module.css";

function NavBar() {
  return (
    <div className={styles.containParents}>
      <div className={styles.containLeft}>
        <img src={Logo} alt="logo prodkat" className={styles.logo} />
      </div>
      <div className={styles.containRight}>
        <img
          src={Search}
          alt="search with the magnifying glass"
          className={styles.search}
        />
        <img
          src={Signin}
          alt="profil for signin or signup"
          className={styles.profile}
        />
      </div>
    </div>
  );
}

export default NavBar;
