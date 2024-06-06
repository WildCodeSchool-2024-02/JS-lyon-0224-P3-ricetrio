import logo from "../assets/images/KAT.png";
import search from "../assets/images/search.png";
import signin from "../assets/images/sign-in.png";
import styles from "./Navbar.module.css";

function NavBar() {
  return (
    <div className={styles.containParents}>
      <div className={styles.containLeft}>
        <img src={logo} alt="logo KAT" className={styles.logo} />
      </div>
      <div className={styles.containRight}>
        <img
          src={search}
          alt="search with the magnifying glass"
          className={styles.search}
        />
        <img
          src={signin}
          alt="profil for signin or signup"
          className={styles.profile}
        />
      </div>
    </div>
  );
}

export default NavBar;
