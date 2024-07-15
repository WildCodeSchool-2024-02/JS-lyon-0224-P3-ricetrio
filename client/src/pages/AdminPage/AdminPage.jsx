import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import styles from "./adminPage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function AdminPage() {
  const initialFilms = useLoaderData();
  const [allFilms, setAllFilms] = useState(initialFilms);
  const [refreshFilm, setRefreshFilm] = useState(0);

  const fetchFilms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/films`);
      const data = await response.json();
      setAllFilms(data);
    } catch (error) {
      console.error("Failed to fetch films:", error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [refreshFilm]);

  const handleDelete = async (id) => {
    console.info("Deleting film with id:", id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/films/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.status === 200) {
        console.info("L'opération a réussie", id);
      } else {
        console.info("L'opération a échouée");
      }

      setRefreshFilm((i) => i + 1);
    } catch (err) {
      console.error(err);
      console.info("Une erreur s'est produite");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.adminContainer}>
        <h2 className="adminTitle">Admin</h2>

        <div className={styles.adminButton}>
          <Link to="/creationpagefilm">
            <button type="submit">Ajouter</button>
          </Link>
        </div>
      </div>
      <div className={styles.posterContainer}>
        {allFilms.map((film) => (
          <div className={styles.posterAdmin} key={film.id}>
            <img src={film.poster_link} alt={film.title} />
            <button
              onClick={() => handleDelete(film.id)}
              type="button"
              className={styles.adminButton}
            >
              Supprimer
            </button>
            <Link to={`/bandeannonce/${film.id}/edit`}>
              <button type="submit">Modifier</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
