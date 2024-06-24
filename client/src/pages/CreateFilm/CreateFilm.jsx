import { Link } from "react-router-dom";
import Arrow from "../../assets/images/arrow.svg";
import styles from "./createFilm.module.css";

function CreateFilm() {
  return (
    <div className={styles.createPage}>
      <div className={styles.header}>
        <Link to="/">
          <img
            src={Arrow}
            alt="Flèche pour tourner à la page d'accueil"
            className={styles.arrow}
          />
        </Link>
        <h2>Ajouter une nouvelle fiche de film</h2>
      </div>
      <form className={styles.contactForm}>
        <div className={styles.formulaire}>
          <h4>Clé du film</h4>
          <div className={styles.movieKey}>
            <input type="number" placeholder="Clé du film" />
          </div>
          <h4>Titre</h4>
          <div className={styles.title}>
            <input type="text" placeholder="Thien la force tranquille" />
          </div>
          <h4>Genre</h4>
          <div className={styles.genre}>
            <input type="text" placeholder="Comédie, Drame, Thriller" />
          </div>
          <h4>Durée</h4>
          <div className={styles.time}>
            <input type="number" placeholder="126" min="1" />
          </div>
          <h4>Date de sortie</h4>
          <div className={styles.date}>
            <input type="text" placeholder="1982-08-25" />
          </div>
          <h4>Note</h4>
          <div className={styles.note}>
            <input
              type="number"
              placeholder="9.9"
              min="0"
              max="10"
              step="0.1"
            />
          </div>
          <h4>Résumé</h4>
          <div className={styles.resume}>
            <textarea
              type="text"
              placeholder="Urssaf est un chat sans poil qui a toujours un air malheureux parce qu'il a toujours froid."
            />
          </div>
          <h4>Réalisateur·rice</h4>
          <div className={styles.movie_director}>
            <input type="text" placeholder="Kana Mutagorou" />
          </div>
          <h4>Poster</h4>
          <div className={styles.poster}>
            <input
              type="url"
              placeholder="https://image.tmdb.org/t/p/w500/7nrQxtiRjbJYnWpAhDsGieoaDfT.jpg"
            />
          </div>
          <h4>Clé de la bande annonce</h4>
          <div className={styles.key_trailer}>
            <input type="text" placeholder="EMq7B85H5D0" />
          </div>
          <h4>Bande annonce</h4>
          <div className={styles.movie_director}>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=EMq7B85H5D0"
            />
          </div>
          <h4>Freenium</h4>
          <div className={styles.movie_director}>
            <input type="text" placeholder="TRUE" />
          </div>
          <button type="submit">
            <h3>Sauvegarder</h3>
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateFilm;
