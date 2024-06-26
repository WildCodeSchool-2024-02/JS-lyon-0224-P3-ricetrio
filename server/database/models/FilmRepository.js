const AbstractRepository = require("./AbstractRepository");

class filmRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "stations" as configuration
    super({ table: "film" });
  }

  // The C of CRUD - Create operation

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all stationss from the "stations" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of stationss
    return rows;
  }

  async create(filmAdd) {
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (movie_key, title, genre, duration, release_date, overview, movie_director, poster_link, key_trailer, trailer_url, freemium, background_img)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        filmAdd.movie_key,
        filmAdd.title,
        filmAdd.genre,
        filmAdd.duration,
        filmAdd.release_date,
        filmAdd.overview,
        filmAdd.movie_director,
        filmAdd.poster_link,
        filmAdd.key_trailer,
        filmAdd.trailer_url,
        filmAdd.freemium,
        filmAdd.background_img,
      ]
    );

    // Execute the query and return the result
    return result.insertId;
  }
}

module.exports = filmRepository;
