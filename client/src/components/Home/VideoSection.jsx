import { useLoaderData } from "react-router-dom";

import VideoCarousel from "./VideoCarousel";
import styles from "./videosection.module.css";

export default function VideoSection() {
  const allVideos = useLoaderData();

  const filterVideosByDecade = (videos, startYear, endYear) =>
    videos.filter(
      (video) =>
        new Date(video.release_date).getFullYear() >= startYear &&
        new Date(video.release_date).getFullYear() <= endYear
    );

  const decades = [
    { label: "2000's", startYear: 2000, endYear: 2009 },
    { label: "1990's", startYear: 1990, endYear: 1999 },
    { label: "1980's", startYear: 1980, endYear: 1989 },
    { label: "1970's", startYear: 1970, endYear: 1979 },
  ];

  const videoSections = decades.map((decade) => {
    const videos = filterVideosByDecade(
      allVideos,
      decade.startYear,
      decade.endYear
    );

    return (
      <VideoCarousel key={decade.label} videos={videos} label={decade.label} />
    );
  });

  return <div className={styles.videoSectionContainer}>{videoSections}</div>;
}
