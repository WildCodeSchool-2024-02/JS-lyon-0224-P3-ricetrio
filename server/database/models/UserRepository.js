// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

// Repository pour la table "users"
class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (pseudo, email, password)
      VALUES (?, ?, ?)
    `,
      [user.pseudo, user.email, user.password]
    );

    // Execute the query and return the result
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select id, email, is_admin from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `select id, email, is_admin from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  async readByEmailWithPassword(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where pseudo = ?`,
      [email]
    );

    // Return the array of users
    return rows;
  }
}

module.exports = UserRepository;
