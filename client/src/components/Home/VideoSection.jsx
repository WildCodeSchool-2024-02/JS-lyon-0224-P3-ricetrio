import { useLoaderData } from "react-router-dom";

export default function VideoSection() {
  const videos = useLoaderData();

  if (!videos) {
    return <p>Loading...</p>;
  }

  if (videos.length === 0) {
    return <p>No videos available</p>;
  }

  return (
    <>
      {videos.map((video) => (
        <h1 key={video.id}>{video.title}</h1>
      ))}
    </>
  );
}
