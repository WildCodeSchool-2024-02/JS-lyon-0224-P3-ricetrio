const tables = require("../../database/tables");

// READ: Fonction pour lire les favoris d'un utilisateur spécifique
const read = async (req, res, next) => {
  try {
    const { userId } = req.params; // Extraction de l'ID de l'utilisateur depuis les paramètres de la requête
    const favorites = await tables.favorite.readByUserId(userId); // Lecture des favoris de l'utilisateur à partir de la base de données
    res.json(favorites); // Envoi des favoris en réponse au client au format JSON
  } catch (err) {
    next(err); // Transmission de l'erreur au middleware suivant pour la gestion des erreurs
  }
};

// Fonction pour ajouter un film aux favoris d'un utilisateur
const addFavorite = async (req, res, next) => {
  try {
    const favorite = req.body; // Récupéation des données du favori depuis le corps de la requêter
    const isFavorite = await tables.favorite.isFavorite(
      favorite.filmId,
      favorite.userId
    ); // Vérification si le film est déjà dans les favoris de l'utilisateur
    if (!isFavorite) {
      const insertId = await tables.favorite.create(favorite); // Ajout du favori à la base de données si ce n'est pas déjà le cas
      res.status(201).json({ insertId }); // Réponse avec un statut 201 (créé) et l'ID de l'élément inséré
    } else {
      res.status(400).json({ message: "Déjà en favori" }); // Réponse avec un statut 400 (mauvaise requête) si le film est déjà en favori
    }
  } catch (err) {
    console.error("Error in add function:", err); // Log de l'erreur pour le débogage

    next(err); // Transmission de l'erreur au middleware suivant pour la gestion des erreurs
  }
};

// Fonction pour retirer un film des favoris d'un utilisateur
const removeFavorite = async (req, res, next) => {
  try {
    const favorite = req.body; // Récupération des données du favori depuis le corps de la requête
    const deleted = await tables.favorite.delete(favorite); // Suppression du favori dans la base de données
    if (deleted) {
      res.sendStatus(204); // Réponse avec un statut 204 (aucun contenu) pour indiquer que la suppression a réussi
    } else {
      res.status(404).json({ message: "Favori non trouvé" }); // Réponse avec un statut 404 (non trouvé) si le favori n'existe pas
    }
  } catch (err) {
    next(err); // Transmission de l'erreur au middleware suivant pour la gestion des erreurs
  }
};

module.exports = {
  read,
  addFavorite,
  removeFavorite,
};
