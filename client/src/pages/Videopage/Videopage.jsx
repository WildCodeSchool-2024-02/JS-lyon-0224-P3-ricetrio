import { useLoaderData } from "react-router-dom";
import styles from "./Videopage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function VideoPage() {
  const allFilms = useLoaderData();
  if (!allFilms === true) {
    return <p>Chargement...</p>;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.videoPage}>
        <div className={styles.title}>
          <p className={styles.titre}>{allFilms.title}</p>
        </div>
        <div className={styles.description}>
          <div className={styles.poster}>
            <img
              src={allFilms.poster_link}
              alt={allFilms.title}
              className={styles.affiche}
            />
          </div>
          <div className={styles.info}>
            <p className={styles.detail}>Description</p>
            <div className={styles.infoDetail}>
              <p>Date de sortie : {formatDate(allFilms.release_date)}</p>
              <p>Durée : {allFilms.duration} minutes</p>
              <p>Genre : {allFilms.genre}</p>
              <p>Réalisateur : {allFilms.movie_director}</p>
            </div>
          </div>
        </div>

        <div className={styles.synopsis}>
          <p className={styles.resume}>Résumé</p>
          <p className={styles.overview}>{allFilms.overview}</p>
        </div>

        <div className={styles.video}>
          <iframe
            src={`https://www.youtube.com/embed/${allFilms.key_trailer}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
