import { useLoaderData } from "react-router-dom";
import FilmCarousel, { useCarousel } from "./FilmSectionCarousel";

export default function FilmSection() {
  const allFilms = useLoaderData();

  const filterfilmsByDecade = (films, startYear, endYear) =>
    films.filter((film) => {
      const releaseYear = new Date(film.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

  const twentiesfilms = filterfilmsByDecade(allFilms, 2000, 2009);
  const ninetiesfilms = filterfilmsByDecade(allFilms, 1990, 1999);
  const eightiesfilms = filterfilmsByDecade(allFilms, 1980, 1989);
  const seventiesfilms = filterfilmsByDecade(allFilms, 1970, 1979);

  const [currentTwenty, handleTwentyNext, handleTwentyPrev] = useCarousel(
    twentiesfilms.length
  );
  const [currentNinety, handleNinetyNext, handleNinetyPrev] = useCarousel(
    ninetiesfilms.length
  );
  const [currentEighty, handleEightyNext, handleEightyPrev] = useCarousel(
    eightiesfilms.length
  );
  const [currentSeventy, handleSeventyNext, handleSeventyPrev] = useCarousel(
    seventiesfilms.length
  );

  return (
    <>
      <FilmCarousel
        films={twentiesfilms}
        currentIndex={currentTwenty}
        handleNext={handleTwentyNext}
        handlePrev={handleTwentyPrev}
        title="Années 20"
      />
      <FilmCarousel
        films={ninetiesfilms}
        currentIndex={currentNinety}
        handleNext={handleNinetyNext}
        handlePrev={handleNinetyPrev}
        title="Années 90"
      />
      <FilmCarousel
        films={eightiesfilms}
        currentIndex={currentEighty}
        handleNext={handleEightyNext}
        handlePrev={handleEightyPrev}
        title="Années 80"
      />
      <FilmCarousel
        films={seventiesfilms}
        currentIndex={currentSeventy}
        handleNext={handleSeventyNext}
        handlePrev={handleSeventyPrev}
        title="Années 70"
      />
    </>
  );
}
