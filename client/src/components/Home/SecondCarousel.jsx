import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./secondCarousel.module.css";

export default function SecondCarousel() {
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

  return (
    <div className={styles.principalContainer}>
      <img
        className={styles.logoEmbla}
        src="https://images7.alphacoders.com/133/thumb-1920-1330715.png"
        alt=""
      />
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
          <div className={styles.embla_slide}>
            <img
              className={styles.carouselIMg}
              src="https://www.posters.fr/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/p/pp34925.jpg"
              alt=""
            />
          </div>
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
