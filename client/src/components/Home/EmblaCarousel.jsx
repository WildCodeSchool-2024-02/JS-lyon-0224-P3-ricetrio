import { useCallback, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./maincarousel.module.css";

export default function EmblaCarousel() {
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
    playOnInit: true,
  };

  const [emblaRef, slide] = useEmblaCarousel({ loop: false }, [
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

  const allVideos = useLoaderData();

  if (!allVideos === true) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {allVideos.map((video) => (
            <div className={styles.embla_slide} key={video.id}>
              <Link to="/videopage">
                <div className={styles.divSize}>
                  <img
                    className={styles.poster}
                    src={video.poster_link}
                    alt={video.title}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.buttonsCarousel}>
          <button
            type="button"
            className={`${styles.buttonCarousel} ${!prevBtnEnabled ? styles.disabled : ""}`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            Prev
          </button>
          <button
            type="button"
            className={`${styles.buttonCarousel} ${!nextBtnEnabled ? styles.disabled : ""}`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
