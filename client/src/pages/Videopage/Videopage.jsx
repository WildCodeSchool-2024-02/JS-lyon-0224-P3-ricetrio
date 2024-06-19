import { useLoaderData } from "react-router-dom";
import styles from "./Videopage.module.css";
import NavBar from "../../components/Navbar/Navbar";

function VideoPage() {
  const allFilms = useLoaderData();
  if (!allFilms === true) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <NavBar />
        <div className={styles.videoPage}>
          {allFilms.map((film) =>(
            <div key={film.id}>
            <section className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/${(film.key_trailer)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </section>
            <h3>{film.title}</h3>
            <section className={styles.synopsis}>
              <p>
                {film.overview}
              </p>
            </section>
            <section className={styles.description}>
              <p>Date de sortie : {film.release_date}</p>
              <p>Durée : {film.duration} minutes</p>
              <p>Genre : {film.genre}</p>
              <p>Réalisateur : {film.movie_director}</p>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;
