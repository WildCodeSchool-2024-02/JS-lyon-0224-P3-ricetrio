import { useLoaderData } from "react-router-dom";

export default function VideoSection() {
  const allVideos = useLoaderData();

  if (!allVideos === true) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {allVideos.map((video) => (
        <div key={video.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${video.poster}`}
            alt={video.poster}
          />
        </div>
      ))}
    </>
  );
}
