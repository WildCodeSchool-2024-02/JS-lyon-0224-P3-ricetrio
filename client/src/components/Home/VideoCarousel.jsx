import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./videosection.module.css";

function VideoCarousel({ videos, label }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div>
      <div className={styles.sectionVideo}>
        <h2>{label} Top 10 Films</h2>
        {videos.slice(currentIndex, currentIndex + 1).map((video) => (
          <div className={styles.containerSection} key={video.id}>
            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
      <div className={styles.containerButtonSectionVideo}>
        <button
          className={styles.buttonSectionVideo}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonSectionVideo}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

VideoCarousel.propTypes = {
  videos: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
  slice: PropTypes.func.isRequired,
};

export default VideoCarousel;
