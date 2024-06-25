import { useCallback, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./maincarousel.module.css";

export default function MainCarousel() {
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    playOnInit: true,
  };

  const [mainRef, slide] = useEmblaCarousel({ loop: false }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!slide === true) return;
    setSelectedIndex(slide.selectedScrollSnap());
    setPrevBtnEnabled(slide.canScrollPrev());
    setNextBtnEnabled(slide.canScrollNext());
  }, [slide]);

  useEffect(() => {
    if (!slide === true) return;
    slide.on("select", onSelect);
    onSelect();
  }, [slide, onSelect, selectedIndex]);

  const scrollPrev = useCallback(() => {
    if (!slide === false) slide.scrollPrev();
  }, [slide]);

  const scrollNext = useCallback(() => {
    if (slide !== null || slide !== undefined) slide.scrollNext();
  }, [slide]);

  const allFilms = useLoaderData();

  if (allFilms === undefined) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.mainCarouselContainer}>
      <div className={styles.wallBackground}>
        <div className={styles.background}>
          {allFilms.length > 0 && (
            <div className={styles.posterAdmin} key={allFilms[0].id}>
              <img src={allFilms[0].background_img} alt={allFilms[0].title} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.main} ref={mainRef}>
          <div className={styles.main__container}>
            {allFilms.map((film) => (
              <div className={styles.main_slide} key={film.id}>
                <Link to={`/bandeannonce/${film.id}/`}>
                  <div className={styles.divSize}>
                    <img
                      className={styles.poster}
                      src={film.poster_link}
                      alt={film.title}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.buttonsCarouselContainer}>
            <button
              type="button"
              className={`${styles.buttonCarousel} ${!prevBtnEnabled ? styles.disabled : ""}`}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              Précédent
            </button>
            <button
              type="button"
              className={`${styles.buttonCarousel} ${!nextBtnEnabled ? styles.disabled : ""}`}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
