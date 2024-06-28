// src/components/CarouselWrapper.js
import { useLoaderData } from "react-router-dom";
import SecondCarousel from "./SecondCarousel";

export default function CarouselWrapper() {
  const allFilms = useLoaderData();

  if (allFilms === undefined) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <SecondCarousel films={allFilms} />
    </div>
  );
}
