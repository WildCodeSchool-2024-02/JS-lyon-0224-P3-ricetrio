// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    // Détermine le rôle de l'utilisateur en fonction de son adresse e-mail
    const role = user.email === "admin@admin.com" ? "admin" : "user";

    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (pseudo, email, hashed_password, role)
      VALUES (?, ?, ?, ?)
    `,
      [user.pseudo, user.email, user.password, role]
    );

    return result.insertId;
  }

  // Les opérations de lecture

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT id, email, role FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT id, email, role FROM ${this.table}`
    );

    return rows;
  }

  async readByPseudoWithPassword(pseudo) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );

    return rows;
  }
}

module.exports = UserRepository;
