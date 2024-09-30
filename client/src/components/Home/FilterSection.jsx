import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./filterSection.module.css";

// Composant principal pour la section de filtrage des films
function FilterSection() {
  // Récupère tous les films via useLoaderData
  const allFilms = useLoaderData();
  // State pour la catégorie des films affichés
  const [category, setCategory] = useState(allFilms);
  // State pour vérifier si l'utilisateur est sur mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Récupère le contexte utilisateur
  const { user } = useUserContext();

  // Filtre les films par décennie
  const filterFilmsByDecade = (films, startYear, endYear) =>
    films.filter((film) => {
      const releaseYear = new Date(film.release_date).getFullYear();
      return releaseYear >= startYear && releaseYear <= endYear;
    });

  // Gère les clics sur les boutons de filtrage
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

  // Gère le redimensionnement de la fenêtre pour détecter si on est sur mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <section>
        <div>
          {isMobile === true ? (
            // Affiche une liste déroulante si on est sur mobile
            <div className={styles.listeDeroulante}>
              <select onChange={handleBtns}>
                <option value="All">Toutes les années</option>
                <option value="1970s">Les années 1970</option>
                <option value="1980s">Les années 1980</option>
                <option value="1990s" disabled={user === ""}>
                  {`${user === "" ? "Veuillez vous connecter" : "Les années 1990"}`}
                </option>
                <option value="2000s" disabled={user === ""}>
                  {`${user === "" ? "Veuillez vous connecter" : "Les années 2000"}`}
                </option>
                <option value="2010s" disabled={user === ""}>
                  {`${user === "" ? "Veuillez vous connecter" : "Les années 2010"}`}
                </option>
                <option value="2020s" disabled={user === ""}>
                  {`${user === "" ? "Veuillez vous connecter" : "Les années 2020"}`}
                </option>
              </select>
            </div>
          ) : (
            // Affiche des boutons si on est sur desktop
            <div className={styles.buttonDecade}>
              <button
                className={styles.buttonTitle}
                type="button"
                value="All"
                onClick={handleBtns}
              >
                Toutes les années
              </button>
              <button
                className={styles.buttonTitle}
                type="button"
                value="1970s"
                onClick={handleBtns}
              >
                Les années 1970
              </button>
              <button
                className={styles.buttonTitle}
                type="button"
                value="1980s"
                onClick={handleBtns}
              >
                Les années 1980
              </button>
              <button
                className={`${styles.buttonTitle} ${
                  user === "" ? styles.disabledButton : styles.buttonTitle
                }`}
                type="button"
                value="1990s"
                onClick={handleBtns}
                disabled={user === ""}
              >
                {`${user === "" ? "Veuillez vous connecter" : "Les années 1990"}`}
              </button>
              <button
                className={`${styles.buttonTitle} ${
                  user === "" ? styles.disabledButton : styles.buttonTitle
                }`}
                type="button"
                value="2000s"
                onClick={handleBtns}
                disabled={user === ""}
              >
                {`${user === "" ? "Veuillez vous connecter" : "Les années 2000"}`}
              </button>
              <button
                className={`${styles.buttonTitle} ${
                  user === "" ? styles.disabledButton : styles.buttonTitle
                }`}
                type="button"
                value="2010s"
                onClick={handleBtns}
                disabled={user === ""}
              >
                {`${user === "" ? "Veuillez vous connecter" : "Les années 2010"}`}
              </button>
              <button
                className={`${styles.buttonTitle} ${
                  user === "" ? styles.disabledButton : styles.buttonTitle
                }`}
                type="button"
                value="2020s"
                onClick={handleBtns}
                disabled={user === ""}
              >
                {`${user === "" ? "Veuillez vous connecter" : "Les années 2020"}`}
              </button>
            </div>
          )}
        </div>
        <div className={styles.posterContainer}>
          <div className={styles.filterPosterContainer}>
            {category.map((film) => (
              <div className={styles.imgContainer} key={film.id}>
                {film.freemium === 1 && user === "" ? (
                  <Link to="/verifyfreemium">
                    <img src={film.poster_link} alt={film.title} />
                  </Link>
                ) : (
                  <Link to={`/bandeannonce/${film.id}/`}>
                    <img src={film.poster_link} alt={film.title} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FilterSection;
