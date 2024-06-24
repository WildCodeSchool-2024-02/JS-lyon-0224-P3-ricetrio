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
}
module.exports = UserRepository;
