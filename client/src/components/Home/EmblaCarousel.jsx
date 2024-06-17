import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect, selectedIndex]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const allVideos = useLoaderData();

  if (!allVideos) {
    return <p>Loading...</p>;
  }

  return (
    <div className="carouselContainer">
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {allVideos.map((video) => (
            <div className={styles.embla_slide} key={video.id}>
              <div className="divSize">
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${video.poster}`}
                  alt={video.poster}
                />
              </div>
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
