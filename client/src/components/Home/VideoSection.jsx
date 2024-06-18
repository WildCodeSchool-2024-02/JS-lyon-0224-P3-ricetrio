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

  const filterVideosByDecade = (videos, startYear, endYear) =>
    videos.filter((video) => {
      const releaseYear = new Date(video.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

  const twentiesVideos = filterVideosByDecade(allVideos, 2000, 2009);
  const ninetiesVideos = filterVideosByDecade(allVideos, 1990, 1999);
  const eightiesVideos = filterVideosByDecade(allVideos, 1980, 1989);
  const seventiesVideos = filterVideosByDecade(allVideos, 1970, 1979);
  console.log("Twenties Videos:", twentiesVideos);
  console.log("ninetiesVideos:", ninetiesVideos);

  return (
    <>
      <h2 className={styles.sectionvideotitle}>20's Film</h2>
      <div className={styles.sectionvideo}>
        {twentiesVideos.slice(currentIndex, currentIndex + 2).map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <div className={styles.divSize}>
              <div className={styles.divSize}>
                <img
                  className={styles.poster}
                  src={video.poster_link}
                  alt={video.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerbuttonsectionvideo}>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
      <h2 className={styles.sectionvideotitle}>90's Film</h2>
      <div className={styles.sectionvideo}>
        {ninetiesVideos.slice(currentIndex, currentIndex + 2).map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <div className={styles.divSize}>
              <img
                className={styles.poster}
                src={video.poster_link}
                alt={video.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerbuttonsectionvideo}>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
      <h2 className={styles.sectionvideotitle}>80's Film</h2>
      <div className={styles.sectionvideo}>
        {eightiesVideos.slice(currentIndex, currentIndex + 2).map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <div className={styles.divSize}>
              <img
                className={styles.poster}
                src={video.poster_link}
                alt={video.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerbuttonsectionvideo}>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
      <h2 className={styles.sectionvideotitle}>70's Film</h2>
      <div className={styles.sectionvideo}>
        {seventiesVideos.slice(currentIndex, currentIndex + 2).map((video) => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <div className={styles.divSize}>
              <img
                className={styles.poster}
                src={video.poster_link}
                alt={video.title}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerbuttonsectionvideo}>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className={styles.buttonsectionvideo}
          type="button"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
