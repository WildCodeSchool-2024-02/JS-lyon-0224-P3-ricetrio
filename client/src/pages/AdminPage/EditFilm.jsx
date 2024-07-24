import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./edit.module.css";

function EditFilm() {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const editMode = id !== undefined;
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text); // Notification d'erreur ajoutée

  const [newFilm, setNewFilm] = useState({
    title: "",
    genre: "",
    duration: "",
    release_date: "",
    overview: "",
    movie_director: "",
    poster_link: "",
    key_trailer: "",
    trailer_url: "",
    freemium: "",
    background_img: "",
    id: "",
  });

  useEffect(() => {
    if (editMode !== undefined) {
      fetch(`${api}/api/films/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedDate = data.release_date.split("T")[0];
          setNewFilm({
            title: data.title,
            genre: data.genre,
            duration: data.duration,
            release_date: formattedDate,
            overview: data.overview,
            movie_director: data.movie_director,
            poster_link: data.poster_link,
            key_trailer: data.key_trailer,
            trailer_url: data.trailer_url,
            freemium: data.freemium,
            background_img: data.background_img,
            id: data.id,
          });
        })
        .catch((error) =>
          notifyError("Erreur lors de la récupération du film :", error)
        );
    }
  }, [api, editMode, id]);

  const handleUpdateForm = (e) => {
    setNewFilm({ ...newFilm, [e.target.name]: e.target.value });
  };

  const handleFilms = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/api/films/${editMode ? id : ""}`, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFilm),
      });

      if (response.status === 200) {
        navigate(`/bandeannonce/${id}`);
        notifySuccess("L'opération de modification du contenu a réussi");
      } else {
        notifyError("L'opération de modification du contenu a échouée");
      }
    } catch (err) {
      notifyError("Une erreur s'est produite :", err);
    }
  };

  return (
    <div className={styles.editFormContainer}>
      <form className={styles.editForm} method="put" onSubmit={handleFilms}>
        <p className={styles.editTitle}>Titre</p>
        <input
          className={styles.editInput}
          type="text"
          name="title"
          value={newFilm.title}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Résumé</p>
        <textarea
          className={styles.editInput}
          type="text"
          name="overview"
          value={newFilm.overview}
          onChange={handleUpdateForm}
        />

        <p className={styles.editTitle}>Durée</p>
        <input
          className={styles.editInput}
          type="text"
          name="duration"
          value={newFilm.duration}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Date de sortie</p>
        <input
          className={styles.editInput}
          type="text"
          name="release_date"
          value={newFilm.release_date}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Genre</p>
        <input
          className={styles.editInput}
          type="text"
          name="genre"
          value={newFilm.genre}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Producteur</p>
        <input
          className={styles.editInput}
          type="text"
          name="movie_director"
          value={newFilm.movie_director}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Affiche du film</p>
        <input
          className={styles.editInput}
          type="text"
          name="poster_link"
          value={newFilm.poster_link}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Clé du trailer</p>
        <input
          className={styles.editInput}
          type="text"
          name="key_trailer"
          value={newFilm.key_trailer}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>URL du trailer</p>
        <input
          className={styles.editInput}
          type="text"
          name="trailer_url"
          value={newFilm.trailer_url}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Freemium</p>
        <input
          className={styles.editInput}
          type="text"
          name="freemium"
          value={newFilm.freemium}
          onChange={handleUpdateForm}
        />
        <p className={styles.editTitle}>Image de fond</p>
        <input
          className={styles.editInput}
          type="text"
          name="background_img"
          value={newFilm.background_img}
          onChange={handleUpdateForm}
        />
        <button className={styles.editButton} type="submit">
          <p className={styles.saveButton}>Sauvegarder</p>
        </button>
      </form>
      <div className={styles.previewContainer}>
        <div className={styles.previewImgContainer}>
          <img
            className={styles.previewImg}
            src={newFilm.background_img}
            alt="Illustration du film"
          />
        </div>
        <div className={styles.previewTextContainer}>
          <p className={styles.previewTextTitle}>{newFilm.title}</p>
          <p className={styles.previewText}>{newFilm.overview}</p>
          <p className={styles.previewText}>
            {newFilm.duration} minutes {newFilm.release_date}
          </p>
          <p className={styles.previewText}>{newFilm.genre}</p>
          <p className={styles.previewText}>{newFilm.movie_director}</p>
        </div>
      </div>
    </div>
  );
}

export default EditFilm;
