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
      `insert into ${this.table} (nom, genre, sortie, synopsis, poster, lien, youtube) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        film.nom,
        film.genre,
        film.sortie,
        film.synopsis,
        film.poster,
        film.lien,
        film.youtube,
      ]
    );

    // Return the ID of the newly inserted stations
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all stationss from the "stations" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of stationss
    return rows;
  }
}

module.exports = filmRepository;
