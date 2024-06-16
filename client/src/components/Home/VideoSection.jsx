import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import styles from "./maincarousel.module.css";

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
      <h2>20's Top 10 Film</h2>
      <div>
        <div>
          <div>
            <div>
              {allVideos.slice(currentIndex, currentIndex + 1).map((video) => (
                <div key={video.title}>
                  <h3>{video.title}</h3>
                </div>
              ))}
            </div>
            <div className={styles.buttonsCarousel}>
              <button type="button" onClick={handlePrev}>
                &lt;
              </button>
              <button type="button" onClick={handleNext}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
