import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
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
    if (slide === false) slide.scrollPrev();
  }, [slide]);

  const scrollNext = useCallback(() => {
    if (slide === false) slide.scrollNext();
  }, [slide]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        <div className={styles.embla_slide}>
          <Link to="/videopage">
            <img src={Japan} alt="" />
          </Link>
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
          className={`${styles.buttonCarousel} ${!prevBtnEnabled === true ? styles.disabled : ""}`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          Prev
        </button>
        <button
          type="button"
          className={`${styles.buttonCarousel} ${!nextBtnEnabled === true ? styles.disabled : ""}`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
