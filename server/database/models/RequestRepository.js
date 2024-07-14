const AbstractRepository = require("./AbstractRepository");

class RequestRepository extends AbstractRepository {
  constructor() {
    super({ table: "request" });
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // The C of CRUD - Create operation

  async create(request) {
    // Execute the SQL INSERT query
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (request) VALUES (?)`,
      [request.request]
    );
    // Return the ID of the newly inserted Recipe
    return result.insertId;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all rows from the "request" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }
}

module.exports = RequestRepository;
