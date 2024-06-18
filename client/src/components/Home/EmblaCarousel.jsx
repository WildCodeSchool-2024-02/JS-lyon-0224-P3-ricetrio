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
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {allVideos.map((video) => (
          <div className={styles.embla_slide} key={video.id}>
            <img
              className="imgSlider"
              src={`https://image.tmdb.org/t/p/w500/${video.poster}`}
              alt={video.poster}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttonsCarousel}>
        <button
          type="button"
          className={`${styles.buttonCarousel} ${!prevBtnEnabled === true ? styles.disabled : ""}`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          &lt;
        </button>
        <button
          type="button"
          className={`${styles.buttonCarousel} ${!nextBtnEnabled === true ? styles.disabled : ""}`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
