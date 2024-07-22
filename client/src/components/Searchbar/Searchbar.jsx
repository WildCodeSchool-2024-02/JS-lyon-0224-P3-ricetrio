import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./searchbar.module.css";

function Searchbar() {
  const allFilms = useLoaderData();
  const [searchFilm, setSearchFilm] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useUserContext();

  const searchResult = (value) =>
    allFilms.filter(
      (film) =>
        value &&
        film &&
        film.genre &&
        film.title &&
        (film.genre.toLowerCase().includes(value.toLowerCase()) ||
          film.title.toLowerCase().includes(value.toLowerCase()))
    );

  const handleSearchFilm = (value) => {
    setSearchFilm(value);
    setResults(searchResult(value));
  };

  return (
    <div className={styles.searchbarContainer}>
      {user !== "" ? (
        <>
          <p>Chercher un film par son titre ou son genre</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className={styles.searchbarInput}
              type="text"
              placeholder=""
              name="film"
              value={searchFilm}
              onChange={(e) => handleSearchFilm(e.target.value)}
            />
          </form>
          <ul className={styles.searchResult}>
            {results.map((film) => (
              <Link key={film.id} to={`/bandeannonce/${film.id}/`}>
                <li key={film.id}>{film.title}</li>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <p>Bienvenue sur Prodkat, bon voyage cinématographique !</p>
      )}
    </div>
  );
}

export default Searchbar;
