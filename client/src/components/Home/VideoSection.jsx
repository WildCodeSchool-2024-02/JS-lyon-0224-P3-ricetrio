import { useLoaderData } from "react-router-dom";

export default function VideoSection() {
  const allVideos = useLoaderData();

  if (!allVideos === true) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {allVideos.map((video) => (
        <h1 key={video.id}>{video.title}</h1>
      ))}
    </>
  );
}
