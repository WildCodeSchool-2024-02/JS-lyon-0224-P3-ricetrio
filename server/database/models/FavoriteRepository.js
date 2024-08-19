// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    // super : Dans le constructeur, le mot-clé super est utilisé pour appeler le constructeur de la classe mère (AbstractRepository).
    super({ table: "favorite" }); // Le nom de la table manipulée par ce repository est "favorite"
  }

  async readByUserId(userId) {
    // Exécute la requête SQL SELECT pour récupérer tous les films favoris pour un utilisateur
    const [rows] = await this.database.query(
      `SELECT film.id, film.title
       FROM ${this.table}
       JOIN film ON favorite.film_id = film.id
       WHERE favorite.user_id = ?`,
      [userId]
    );
    return rows; // Retourne les lignes obtenues, qui contiennent les films favoris de l'utilisateur
  }

  async create(favorite) {
    // Exécute la requête SQL INSERT pour ajouter un nouveau film favori pour un utilisateur
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (film_id, user_id ) VALUES (?, ?) `,
      [favorite.filmId, favorite.userId]
    );

    // Retourne l'ID de la nouvelle entrée insérée
    return result.insertId;
  }

  async isFavorite(filmId, userId) {
    // Vérifie si un film est déjà enregistré comme favori pour un utilisateur donné
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE film_id = ? AND user_id = ?`,
      [filmId, userId]
    );
    return rows.length > 0; // Retourne true si le film est déjà favori, sinon false
  }

  async delete(favorite) {
    // Exécute la requête SQL DELETE pour supprimer un film favori pour un utilisateur
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE film_id = ? AND user_id = ?`,
      [favorite.filmId, favorite.userId]
    );
    return result.affectedRows > 0; // Retourne true si la suppression a réussi, sinon false
  }
}

module.exports = FavoriteRepository; // Exporte la classe FavoriteRepository pour être utilisée dans d'autres parties de l'application
