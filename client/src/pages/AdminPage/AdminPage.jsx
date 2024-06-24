import { useLoaderData } from "react-router-dom";
import styles from "./adminPage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function AdminPage() {
  const allFilms = useLoaderData();
  return (
    <div>
      <NavBar />
      <div className={styles.adminContainer}>
        <h2>Admin</h2>

        <div className={styles.adminButton}>
          <button type="submit">Ajouter</button>
        </div>
      </div>
      <div className={styles.posterContainer}>
        {allFilms.map((film) => (
          <div className={styles.posterAdmin} key={film.id}>
            <img src={film.poster_link} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
