import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import styles from "./videosection.module.css";

export default function VideoSection() {
  const allVideos = useLoaderData();
  console.log(allVideos);

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
  console.log(allVideos);

  const twentiesVideos = filterVideosByDecade(allVideos, 2000, 2009);
  // const ninetiesVideos = filterVideosByDecade(allVideos, 1990, 1999);
  // const eightiesVideos = filterVideosByDecade(allVideos, 1980, 1989);
  // const seventiesVideos = filterVideosByDecade(allVideos, 1970, 1979);
  console.log("Twenties Videos:", twentiesVideos);

  return (
    <>
      <h2 className={styles.sectionvideotitle}>20's Film</h2>
      <div className={styles.sectionvideo}>
        {twentiesVideos.slice(currentIndex, currentIndex + 2).map((video) => (
          <div className={styles.containersection} key={video.id}>
            <h3>{video.title}</h3>
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

// import { useLoaderData } from "react-router-dom";

// import VideoCarousel from "./VideoCarousel";
// import styles from "./videosection.module.css";

// export default function VideoSection() {
//   const allVideos = useLoaderData();

//   const filterVideosByDecade = (videos, startYear, endYear) =>
//     videos.filter(
//       (video) =>
//         new Date(video.release_date).getFullYear() >= startYear &&
//         new Date(video.release_date).getFullYear() <= endYear
//     );

//   const decades = [
//     { label: "2000's", startYear: 2000, endYear: 2009 },
//     { label: "1990's", startYear: 1990, endYear: 1999 },
//     { label: "1980's", startYear: 1980, endYear: 1989 },
//     { label: "1970's", startYear: 1970, endYear: 1979 },
//   ];

//   const videoSections = decades.map((decade) => {
//     const videos = filterVideosByDecade(
//       allVideos,
//       decade.startYear,
//       decade.endYear
//     );

//     return (
//       <VideoCarousel key={decade.label} videos={videos} label={decade.label} />
//     );
//   });

//   return <div className={styles.videoSectionContainer}>{videoSections}</div>;
// }
