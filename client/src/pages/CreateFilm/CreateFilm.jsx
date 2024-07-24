import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ValidationFilm from "./CreateFilmValidation";
import Arrow from "../../assets/images/arrow.svg";
import styles from "./createFilm.module.css";

const URL = import.meta.env.VITE_API_URL;

function CreateFilm() {
  const navigate = useNavigate();
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  // Initialisation de l'état local pour les valeurs du formulaire de création de film
  const [values, setValues] = useState({
    movie_key: "",
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
  });

  const [errors, setErrors] = useState({}); // Initialisation de l'état local pour les erreurs de validation

  // Gestion de la mise à jour des valeurs du formulaire et validation des champs
  const handleInputCreate = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors(ValidationFilm(values));
  };

  // Gestion de la soumission du formulaire de création de film
  const handleSubmitCreate = async (event) => {
    event.preventDefault();

    const validationErrors = ValidationFilm(values); // Validation des champs du formulaire
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${URL}/api/films`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          notifySuccess("L'opération d'ajout du contenu a réussi");
        } else {
          notifyError("L'opération d'ajout du contenu a échoué");
        }

        navigate("/admin");
      } catch (err) {
        notifyError("L'opération d'ajout du contenu a échoué");
      }
    }
  };

  return (
    <div className={styles.createPage}>
      <div className={styles.header}>
        <Link to="/admin">
          <img
            src={Arrow}
            alt="Flèche pour retourner à la page d'accueil"
            className={styles.arrow}
          />
        </Link>
        <h2>Ajouter une nouvelle fiche de film</h2>
      </div>
      <Form
        method="post"
        className={styles.contactForm}
        onSubmit={handleSubmitCreate}
      >
        <div className={styles.formulaire}>
          <h4>Clé du film</h4>
          <div className={styles.movieKey}>
            <input
              type="number"
              placeholder="Clé du film"
              name="movie_key"
              value={values.movie_key}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.movie_key && <span>{errors.movie_key}</span>}
            </p>
          </div>
          <h4>Titre</h4>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Thien la force tranquille"
              name="title"
              value={values.title}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.title && <span>{errors.title}</span>}
            </p>
          </div>
          <h4>Genre</h4>
          <div className={styles.genre}>
            <input
              type="text"
              placeholder="Comédie, Drame, Thriller"
              name="genre"
              value={values.genre}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.genre && <span>{errors.genre}</span>}
            </p>
          </div>
          <h4>Durée</h4>
          <div className={styles.time}>
            <input
              type="number"
              placeholder="126"
              min="1"
              name="duration"
              value={values.duration}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.duration && <span>{errors.duration}</span>}
            </p>
          </div>
          <h4>Date de sortie</h4>
          <div className={styles.date}>
            <input
              type="text"
              placeholder="1982-08-25"
              name="release_date"
              value={values.release_date}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.release_date && <span>{errors.release_date}</span>}
            </p>
          </div>
          <h4>Résumé</h4>
          <div className={styles.resume}>
            <textarea
              type="text"
              placeholder="Urssaf est un chat sans poil qui a toujours un air malheureux parce qu'il a toujours froid."
              name="overview"
              value={values.overview}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.overview && <span>{errors.overview}</span>}
            </p>
          </div>
          <h4>Réalisateur·rice</h4>
          <div className={styles.movie_director}>
            <input
              type="text"
              placeholder="Kana Mutagorou"
              name="movie_director"
              value={values.movie_director}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.movie_director && <span>{errors.movie_director}</span>}
            </p>
          </div>
          <h4>Poster</h4>
          <div className={styles.poster}>
            <input
              type="url"
              placeholder="https://image.tmdb.org/t/p/w500/7nrQxtiRjbJYnWpAhDsGieoaDfT.jpg"
              name="poster_link"
              value={values.poster_link}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.poster_link && <span>{errors.poster_link}</span>}
            </p>
          </div>
          <h4>Clé de la bande annonce</h4>
          <div className={styles.key_trailer}>
            <input
              type="text"
              placeholder="EMq7B85H5D0"
              name="key_trailer"
              value={values.key_trailer}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.key_trailer && <span>{errors.key_trailer}</span>}
            </p>
          </div>
          <h4>Bande annonce</h4>
          <div className={styles.trailer_url}>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=EMq7B85H5D0"
              name="trailer_url"
              value={values.trailer_url}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.trailer_url && <span>{errors.trailer_url}</span>}
            </p>
          </div>
          <h4>Freemium</h4>
          <div className={styles.freemium}>
            <input
              type="text"
              placeholder="0 (FALSE) 1(TRUE)"
              name="freemium"
              value={values.freemium}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.freemium && <span>{errors.freemium}</span>}
            </p>
          </div>
          <h4>Image d'illustration</h4>
          <div className={styles.background_image}>
            <input
              type="url"
              placeholder="https://image.tmdb.org/t/p/w500/7nrQxtiRjbJYnWpAhDsGieoaDfT.jpg"
              name="background_img"
              value={values.background_img}
              onChange={handleInputCreate}
            />
            <p className={styles.errorsField}>
              {errors.background_img && <span>{errors.background_img}</span>}
            </p>
          </div>
          <button type="submit">
            <p className={styles.saveTitle}>Sauvegarder</p>
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateFilm;
