import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./maincarousel.module.css";
import Japan from "../../assets/images/japan.png";
import Moutain from "../../assets/images/mountain.png";
import Ricegirl from "../../assets/images/ricegirl.png";
import Vietnam from "../../assets/images/vietnam.png";

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

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        <div className={styles.embla_slide}>
          <img src={Japan} alt="" />
        </div>
        <div className={styles.embla_slide}>
          <img src={Moutain} alt="" />
        </div>
        <div className={styles.embla_slide}>
          <img src={Ricegirl} alt="" />
        </div>
        <div className={styles.embla_slide}>
          <img src={Vietnam} alt="" />
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
  );
}
