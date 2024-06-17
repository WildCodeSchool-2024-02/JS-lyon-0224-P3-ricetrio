import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import styles from "./videosection.module.css";

export default function VideoSection() {
  const allVideos = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allVideos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allVideos.length) % allVideos.length
    );
  };
  if (currentIndex > allVideos.length) {
    setCurrentIndex(0);
  }

  return (
    <>
      <div className={styles.sectionVideo}>
        <h2>20's Top 10 Film</h2>
        {allVideos.slice(currentIndex, currentIndex + 1).map((video) => (
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
      <div className={styles.sectionVideo}>
        <h2>70's Top 10 Film</h2>
        {allVideos.slice(currentIndex, currentIndex + 2).map((video) => (
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
    </>
  );
}
