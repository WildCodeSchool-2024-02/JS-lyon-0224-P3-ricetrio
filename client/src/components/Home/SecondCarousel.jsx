// src/components/SecondCarousel.js
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./secondCarousel.module.css";
import BackImg from "../../assets/images/backImg2.jpg";

export default function SecondCarousel({ films }) {
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    playOnInit: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, selectedIndex]);
  return (
    <div>
      <div className={styles.principalContainer}>
        <div className={styles.contenter}>
          {films.map((film) => (
            <div className={styles.main_slide} key={film.id}>
              <Link to={`/bandeannonce/${film.id}/`}>
                <img className={styles.logoEmbla} src={BackImg} alt="" />
              </Link>
            </div>
          ))}

          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {films.map((film) => (
                <div className={styles.embla_slide} key={film.id}>
                  <Link to={`/bandeannonce/${film.id}/`}>
                    <img
                      className={styles.carouselIMg}
                      src={film.poster_link}
                      alt=""
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SecondCarousel.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      background_img: PropTypes.string.isRequired,
      poster_link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
