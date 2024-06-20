import { useLoaderData } from "react-router-dom";
import FilmCarousel, { useCarousel } from "./FilmSectionCarousel";

export default function FilmSection() {
  const allFilms = useLoaderData();

  const filterfilmsByDecade = (films, startYear, endYear) =>
    films.filter((film) => {
      const releaseYear = new Date(film.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

  const twentiesFilms = filterfilmsByDecade(allFilms, 2000, 2009);
  const ninetiesFilms = filterfilmsByDecade(allFilms, 1990, 1999);
  const eightiesFilms = filterfilmsByDecade(allFilms, 1980, 1989);
  const seventiesFilms = filterfilmsByDecade(allFilms, 1970, 1979);

  const [currentTwenty, handleTwentyNext, handleTwentyPrev] = useCarousel(
    twentiesFilms.length
  );
  const [currentNinety, handleNinetyNext, handleNinetyPrev] = useCarousel(
    ninetiesFilms.length
  );
  const [currentEighty, handleEightyNext, handleEightyPrev] = useCarousel(
    eightiesFilms.length
  );
  const [currentSeventy, handleSeventyNext, handleSeventyPrev] = useCarousel(
    seventiesFilms.length
  );

  return (
    <>
      <FilmCarousel
        films={twentiesFilms}
        currentIndex={currentTwenty}
        handleNext={handleTwentyNext}
        handlePrev={handleTwentyPrev}
        title="Années 20"
      />
      <FilmCarousel
        films={ninetiesFilms}
        currentIndex={currentNinety}
        handleNext={handleNinetyNext}
        handlePrev={handleNinetyPrev}
        title="Années 90"
      />
      <FilmCarousel
        films={eightiesFilms}
        currentIndex={currentEighty}
        handleNext={handleEightyNext}
        handlePrev={handleEightyPrev}
        title="Années 80"
      />
      <FilmCarousel
        films={seventiesFilms}
        currentIndex={currentSeventy}
        handleNext={handleSeventyNext}
        handlePrev={handleSeventyPrev}
        title="Années 70"
      />
    </>
  );
}
