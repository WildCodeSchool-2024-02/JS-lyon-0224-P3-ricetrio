import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./searchbar.module.css";

function Searchbar() {
  const allFilms = useLoaderData();
  const [searchFilm, setSearchFilm] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useUserContext();

  // Fonction pour filtrer les films en fonction de la recherche
  const searchResult = (value) =>
    allFilms.filter(
      (film) =>
        value !== null &&
        film !== null &&
        film.genre !== null &&
        film.title !== null &&
        (film.genre.toLowerCase().includes(value.toLowerCase()) ||
          film.title.toLowerCase().includes(value.toLowerCase()))
    );

  // Fonction appelée lors du changement de la valeur de recherche
  const handleSearchFilm = (value) => {
    setSearchFilm(value);
    setResults(searchResult(value)); // Met à jour les résultats de la recherche
  };

  return (
    <div className={styles.searchbarContainer}>
      {user !== "" ? (
        // Si l'utilisateur est connecté, afficher la barre de recherche et les résultats
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
        // Si l'utilisateur n'est pas connecté, afficher un message de bienvenue
        <p>Bienvenue sur Prodkat, bon voyage cinématographique !</p>
      )}
    </div>
  );
}

export default Searchbar; // Exportation du composant Searchbar
