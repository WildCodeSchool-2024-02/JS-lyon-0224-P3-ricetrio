// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    super({ table: "contact" });
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

  async create(request) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?) `,
      [request.user_Id]
    );

    // Return the first row of the result, which represents the item
    return result.insertId;
  }

  // async readAll() {
  //   // Execute the SQL SELECT query to retrieve all stations from the "station" table
  //   const [rows] = await this.database.query(`select * from ${this.table}`);

  //   // Return the array of stations
  //   return rows;
  // }
}

module.exports = ContactRepository;
