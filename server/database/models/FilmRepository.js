const AbstractRepository = require("./AbstractRepository");

class filmRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "stations" as configuration
    super({ table: "film" });
  }

  // The C of CRUD - Create operation

  async create(film) {
    // Execute the SQL INSERT query to add a new stations to the "stations" table
    const [result] = await this.database.query(
      `insert into ${this.table} (movie_key, title, genre, duration, release_date, overview, movie_director, poster_link, key_trailer, trailer_url, freenium) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        film.movie_key,
        film.title,
        film.genre,
        film.duration,
        film.release_date,
        film.overview,
        film.movie_director,
        film.poster_link,
        film.key_trailer,
        film.trailer_url,
        film.freenium,
      ]
    );

    // Return the ID of the newly inserted stations
    return result.insertId;
  }

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
}

module.exports = filmRepository;
