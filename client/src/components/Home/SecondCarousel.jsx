import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./secondCarousel.module.css";
import BackImg from "../../assets/images/backImg2-black.jpg";

// Composant pour afficher un carrousel avec des films
export default function SecondCarousel({ films }) {
  // Options pour l'autoplay du carrousel
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    playOnInit: true,
  };

  // Initialisation du carrousel avec Embla et les options d'autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  // State pour suivre l'index de la slide sélectionnée
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Callback pour mettre à jour l'index de la slide sélectionnée
  const onSelect = useCallback(() => {
    if (emblaApi === undefined) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Utilisation de useEffect pour attacher le callback de sélection à l'API d'Embla
  useEffect(() => {
    if (emblaApi === undefined) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, selectedIndex]);

  return (
    <div>
      <div className={styles.principalContainer}>
        <div className={styles.contenter}>
          {/* Affichage des fonds d'image */}
          {films.map((film) => (
            <div className={styles.main_slide} key={film.id}>
              <Link to={`/bandeannonce/${film.id}/`}>
                <img
                  className={styles.logoEmbla}
                  src={BackImg}
                  alt="Fond nuageux"
                />
              </Link>
            </div>
          ))}

          {/* Conteneur du carrousel */}
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {/* Affichage des posters de films dans le carrousel */}
              {films.map((film) => (
                <div className={styles.embla_slide} key={film.id}>
                  <Link to={`/bandeannonce/${film.id}/`}>
                    <div className={styles.posterContainer}>
                      <img
                        className={styles.carouselIMg}
                        src={film.poster_link}
                        alt={film.title}
                      />
                    </div>
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

// PropTypes pour valider les propriétés passées au composant
SecondCarousel.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      background_img: PropTypes.string.isRequired,
      poster_link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
