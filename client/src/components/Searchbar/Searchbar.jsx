import { useState, useEffect, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from "./searchbar.module.css";

function Searchbar() {
  const allFilms = useLoaderData();
  const [searchFilm, setSearchFilm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture de la liste de résultats
  const { user } = useUserContext();

  const searchRef = useRef(null); // Référence pour la barre de recherche
  const resultsRef = useRef(null); // Référence pour la liste de résultats

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
    setIsOpen(value.length > 0); // Ouvrir la liste si la recherche n'est pas vide
  };

  // Fonction pour gérer les clics en dehors des éléments de recherche
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target)
    ) {
      setIsOpen(false); // Fermer la liste déroulante
    }
  };

  // Ajouter et nettoyer l'écouteur d'événements
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchbarContainer}>
      {user !== "" ? (
        <>
          <p>Chercher un film par son titre ou son genre</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              ref={searchRef}
              className={styles.searchbarInput}
              type="text"
              placeholder=""
              name="film"
              value={searchFilm}
              onChange={(e) => handleSearchFilm(e.target.value)}
              onFocus={() => setIsOpen(true)} // Ouvrir la liste lors du focus sur le champ
            />
          </form>
          {isOpen && (
            <ul ref={resultsRef} className={styles.searchResult}>
              {results.map((film) => (
                <Link key={film.id} to={`/bandeannonce/${film.id}/`}>
                  <li>{film.title}</li>
                </Link>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Bienvenue sur Brodkat, bon voyage cinématographique !</p>
      )}
    </div>
  );
}

export default Searchbar;
