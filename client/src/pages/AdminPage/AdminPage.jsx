import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./adminPage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function AdminPage() {
  const initialFilms = useLoaderData();

  // État pour stocker tous les films
  const [allFilms, setAllFilms] = useState(initialFilms);

  const [refreshFilm, setRefreshFilm] = useState(0);

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  // Fonction pour récupérer la liste des films depuis l'API
  const fetchFilms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/films`);
      const data = await response.json();
      setAllFilms(data);
    } catch (error) {
      notifyError("Échec lors de la récupération du film");
    }
  };

  // Effet pour récupérer les films au chargement et lors du rafraîchissement
  useEffect(() => {
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFilm]);

  // Fonction pour gérer la suppression d'un film
  const handleDelete = async (id) => {
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
        notifySuccess("L'opération de suppression du contenu a réussi");
      } else {
        notifyError("L'opération de suppression du contenu a échouée");
      }

      setRefreshFilm((i) => i + 1);
    } catch (err) {
      notifyError("Une erreur s'est produite");
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
