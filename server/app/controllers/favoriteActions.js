const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const favorites = await tables.favorite.readByUserId();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const favorite = req.body;
    const isFavorite = await tables.favorite.isFavorite(
      favorite.filmId,
      favorite.userId
    );
    if (!isFavorite) {
      const insertId = await tables.favorite.create(favorite);
      res.status(201).json({ insertId });
    } else {
      res.status(400).json({ message: "Already a favorite" });
    }
  } catch (err) {
    console.error("Error in add function:", err);
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const favorite = req.body;
    const deleted = await tables.favorite.delete(favorite);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  addFavorite,
  removeFavorite,
};
