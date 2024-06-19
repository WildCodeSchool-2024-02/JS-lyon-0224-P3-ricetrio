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
}

module.exports = filmRepository;
