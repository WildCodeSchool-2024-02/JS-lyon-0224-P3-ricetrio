const AbstractRepository = require("./AbstractRepository");

class userRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "stations" as configuration
    super({ table: "user" });
  }
  
  async create(user) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [user.id]
    );
  
    // Return the ID of the newly inserted category
    return result.insertId;
  }
}

module.exports = userRepository;
