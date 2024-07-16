// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    super({ table: "favorite" });
  }

  async readByUserId() {
    // Execute the SQL SELECT query to retrieve all stationss from the "stations" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of stationss
    return rows;
  }

  async create(favorite) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (film_id, user_id ) VALUES (?, ?) `,
      [favorite.filmId, favorite.userId]
    );

    // Return the first row of the result, which represents the item
    return result.insertId;
  }

  async isFavorite(filmId, userId) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE film_id = ? AND user_id = ?`,
      [filmId, userId]
    );
    return rows.length > 0;
  }

  async delete(favorite) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE film_id = ? AND user_id = ?`,
      [favorite.filmId, favorite.userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = FavoriteRepository;
