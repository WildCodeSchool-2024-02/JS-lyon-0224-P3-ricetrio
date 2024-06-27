import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./filmsection.module.css";

export function useCarousel(length) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return [currentIndex, handleNext, handlePrev];
}

export default function FilmCarousel({
  films,
  currentIndex,
  handleNext,
  handlePrev,
  title,
}) {
  return (
    <>
      <h1 className={styles.sectionFilmTitle}>{title}</h1>
      <div className={styles.sectionFilm}>
        {films.slice(currentIndex, currentIndex + 5).map((film) => (
          <div key={film.id}>
            <div className={styles.divSize}>
              <Link to={`/bandeannonce/${film.id}/`}>
                <img
                  className={styles.poster}
                  src={film.poster_link}
                  alt={film.title}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerButtonSectionFilm}>
        <button
          className={styles.buttonSectionFilm}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonSectionFilm}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

FilmCarousel.propTypes = {
  films: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  currentIndex: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
