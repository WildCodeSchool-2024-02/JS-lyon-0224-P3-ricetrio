import { useLoaderData } from "react-router-dom";
import FilmCarousel, { useCarousel } from "./FilmSectionCarousel";

export default function FilmSection() {
  const allFilms = useLoaderData();

  const filterfilmsByDecade = (films, startYear, endYear) =>
    films.filter((film) => {
      const releaseYear = new Date(film.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

    const twentyTwentyFilms = filterfilmsByDecade(allFilms, 2020, 2024);
    const twentyTensFilms = filterfilmsByDecade(allFilms, 2010, 2019);
    const twentiesFilms = filterfilmsByDecade(allFilms, 2000, 2009);
    const ninetiesFilms = filterfilmsByDecade(allFilms, 1990, 1999);
    const eightiesFilms = filterfilmsByDecade(allFilms, 1980, 1989);
    const seventiesFilms = filterfilmsByDecade(allFilms, 1970, 1979);

  const [currentTwentyTwenty, handleTwentyTwentyNext, handleTwentyTwentyPrev] = useCarousel(
    twentyTwentyFilms.length
    );

  const [currentTwentyTens, handleTwentyTensNext, handleTwentyTensPrev] = useCarousel(
    twentyTensFilms.length
    );
    
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
        films={seventiesFilms}
        currentIndex={currentSeventy}
        handleNext={handleSeventyNext}
        handlePrev={handleSeventyPrev}
        title="Années 1970"
      />  

      <FilmCarousel
        films={eightiesFilms}
        currentIndex={currentEighty}
        handleNext={handleEightyNext}
        handlePrev={handleEightyPrev}
        title="Années 1980"
      />

      <FilmCarousel
        films={ninetiesFilms}
        currentIndex={currentNinety}
        handleNext={handleNinetyNext}
        handlePrev={handleNinetyPrev}
        title="Années 1990"
      />

      <FilmCarousel
        films={twentiesFilms}
        currentIndex={currentTwenty}
        handleNext={handleTwentyNext}
        handlePrev={handleTwentyPrev}
        title="Années 2000"
      />

      <FilmCarousel
        films={twentyTensFilms}
        currentIndex={currentTwentyTens}
        handleNext={handleTwentyTensNext}
        handlePrev={handleTwentyTensPrev}
        title="Années 2010"
      />

      <FilmCarousel
        films={twentyTwentyFilms}
        currentIndex={currentTwentyTwenty}
        handleNext={handleTwentyTwentyNext}
        handlePrev={handleTwentyTwentyPrev}
        title="Années 2020"
      />
    </>
  );
}
