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

            <section className={styles.video}>
              <iframe
                src={`https://www.youtube.com/embed/${(allFilms.key_trailer)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </section>
            <h3>{allFilms.title}</h3>
            <section className={styles.synopsis}>
              <p>
                {allFilms.overview}
              </p>
            </section>
            <section className={styles.description}>
              <p>Date de sortie : {allFilms.release_date}</p>
              <p>Durée : {allFilms.duration} minutes</p>
              <p>Genre : {allFilms.genre}</p>
              <p>Réalisateur : {allFilms.movie_director}</p>
            </section>
          </div>

      </div>
  );
}

export default VideoPage;
