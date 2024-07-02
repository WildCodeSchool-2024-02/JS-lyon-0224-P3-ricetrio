import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./filterSection.module.css";

function FilterSection() {
  const allFilms = useLoaderData();
  const [category, setCategory] = useState(allFilms);

  const filterFilmsByDecade = (films, startYear, endYear) =>
    films.filter((film) => {
      const releaseYear = new Date(film.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

  const handleBtns = (e) => {
    const word = e.target.value;

    if (word === "All") {
      setCategory(allFilms);
    } else if (word === "2020s") {
      setCategory(filterFilmsByDecade(allFilms, 2020, 2024));
    } else if (word === "2010s") {
      setCategory(filterFilmsByDecade(allFilms, 2010, 2019));
    } else if (word === "2000s") {
      setCategory(filterFilmsByDecade(allFilms, 2000, 2009));
    } else if (word === "1990s") {
      setCategory(filterFilmsByDecade(allFilms, 1990, 1999));
    } else if (word === "1980s") {
      setCategory(filterFilmsByDecade(allFilms, 1980, 1989));
    } else if (word === "1970s") {
      setCategory(filterFilmsByDecade(allFilms, 1970, 1979));
    }
  };

  return (
    <div>
      <section>
        <div>
          <h2>React Filter</h2>

          <div className={styles.buttonDecade}>
            <button type="button" value="All" onClick={handleBtns}>
              All
            </button>
            <button type="button" value="1970s" onClick={handleBtns}>
              1970s
            </button>
            <button type="button" value="1980s" onClick={handleBtns}>
              1980s
            </button>
            <button type="button" value="1990s" onClick={handleBtns}>
              1990s
            </button>
            <button type="button" value="2000s" onClick={handleBtns}>
              2000s
            </button>
            <button type="button" value="2010s" onClick={handleBtns}>
              2010s
            </button>
            <button type="button" value="2020s" onClick={handleBtns}>
              2020s
            </button>
          </div>
          <div className={styles.posterContainer}>
            <div className={styles.filterPosterContainer}>
              {category.map((film) => (
                <div className={styles.imgContainer} key={film.id}>
                  <img src={film.background_img} alt={film.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FilterSection;
