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
        film.title &&
        film.title.toLowerCase().includes(value.toLowerCase())
    );

  const handleSearchFilm = (value) => {
    setSearchFilm(value);
    setResults(searchResult(value));
  };

  return (
    <div className={styles.searchbarContainer}>
      <form onSubmit={(e) => e.preventDefault()} disabled={!user}>
        <input
          className={styles.searchbarInput}
          type="text"
          placeholder="Cherchez votre film"
          name="film"
          value={searchFilm}
          onChange={(e) => handleSearchFilm(e.target.value)}
        />
      </form>
      <button className={styles.searchButton} type="submit">
        Recherche
      </button>
      <ul>
        {results.map((film) => (
          <Link key={film.id} to={`/bandeannonce/${film.id}/`}>
            <li key={film.id}>{film.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Searchbar;
