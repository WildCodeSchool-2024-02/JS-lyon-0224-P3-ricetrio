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
    res.status(500).json({ error: "Failed to fetch film" });
  }
};

const read = async (req,res) => {
  try{
    const film = await filmRepository.read(req.params.id);
    if(!film === true) {
      res.status(404).json({error:"Film not found"});
      return;
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({error: "Failed to add film"});
  }
};

const add = async (req, res) => {
  try {
    const { title, genre, duration, releaseDate, overview, movieDirector, keyTrailer, trailerUrl, freenium, id } = req.body;
    const insertId = await filmRepository.create({ title, genre, duration, releaseDate, overview, movieDirector, keyTrailer, trailerUrl, freenium, id });
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add film" });
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
};
