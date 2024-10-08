const tables = require("../../database/tables");
const FilmRepository = require("../../database/models/FilmRepository");

const filmRepository = new FilmRepository();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res) => {
  try {
    // Fetch all stations from the database
    const films = await tables.film.readAll();

    // Respond with the stations in JSON format
    res.json(films);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    res.status(500).json({ error: "Échec de la récupération du film" });
  }
};

const read = async (req, res) => {
  try {
    const film = await filmRepository.read(req.params.id); // Extraction de l'ID de film depuis les paramètres de la requête
    if (!film === true) {
      res.status(404).json({ error: "Film non trouvé" });
      return;
    }
    res.json(film);
  } catch (error) {
    res.status(400).json({ error: "Échec du chargement du film" });
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the item data from the request body
  const films = req.body;

  try {
    // Update the item into the database
    const updatedFilms = await tables.film.update(films);

    // Respond with HTTP 201 (OK) and the response data
    res.status(200).json({ updatedFilms });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const filmAdd = req.body;
    // Créer un nouvel utilisateur
    const insertId = await tables.film.create(filmAdd);

    res.status(201).json(insertId); // Répondre avec l'utilisateur créé
  } catch (err) {
    console.error("rreur dans la fonction d'ajout :", err);
    res.status(500).json();
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the item id from the request body
  const { id } = req.body;
  try {
    // Delete the news from the database
    const deletedFilm = await tables.film.delete(id);

    // Respond with HTTP 200 (OK) and the response data
    res.status(200).json({ deletedFilm });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
