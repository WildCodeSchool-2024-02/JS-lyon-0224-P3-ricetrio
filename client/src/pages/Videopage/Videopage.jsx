import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./Videopage.module.css";
import NavBar from "../../components/Navbar/Navbar";
import LikeBlue from "../../assets/images/like-bleu.svg";
import LikeWhite from "../../assets/images/like-blanc.svg";
import { useFavoritesContext } from "../../contexts/FavoriteContext";

function VideoPage() {
  const allFilms = useLoaderData();
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (favorites.some((fav) => fav.id === allFilms.id)) {
      setLike(true);
    }
  }, [favorites, allFilms.id]);

  const handleFavorite = async (event) => {
    event.preventDefault();
    if (like) {
      await removeFavorite(allFilms.id);
    } else {
      await addFavorite(allFilms.id);
    }
    setLike(!like);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.page}>
        <div className={styles.videoPage}>
          <div className={styles.blocInfo}>
            <div className={styles.title}>
              <p className={styles.titre}>{allFilms.title}</p>
              <div className={styles.overview}>
                <p className={styles.resume}>{allFilms.overview}</p>
              </div>
              <div className={styles.timeDate}>
                <p className={styles.duree}>{allFilms.duration} minutes</p>
                <p className={styles.date}>
                  {formatDate(allFilms.release_date)}
                </p>
              </div>
              <p className={styles.genre}>{allFilms.genre}</p>
              <p className={styles.real}>
                Réalisateur.rice : {allFilms.movie_director}
              </p>
              <div className={styles.pouce}>
                <button
                  onClick={handleFavorite}
                  className={styles.buttonLike}
                  type="button"
                  value={like}
                >
                  <img
                    src={like ? LikeBlue : LikeWhite}
                    alt={like ? "Logo j'aime" : "Logo j'aime pas"}
                    className={styles.like}
                  />
                </button>
              </div>
              <p className={styles.annonce}>Découvrir la bande annonce</p>
            </div>
          </div>

          <div className={styles.blocImage}>
            <img
              src={allFilms.background_img}
              alt={allFilms.title}
              className={styles.fond}
            />
          </div>
        </div>
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
  );
}

export default VideoPage;
