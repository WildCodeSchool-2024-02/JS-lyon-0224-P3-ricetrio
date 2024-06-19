import { useState } from "react";
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
      <h2 className={styles.sectionfilmTitle}>{title}</h2>
      <div className={styles.sectionfilm}>
        {films.slice(currentIndex, currentIndex + 2).map((film) => (
          <div key={film.id}>
            <div className={styles.divSize}>
              <img
                className={styles.poster}
                src={film.poster_link}
                alt={film.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerButtonSectionfilm}>
        <button
          className={styles.buttonSectionfilm}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonSectionfilm}
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
  films: PropTypes.string.isRequired,
  currentIndex: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
