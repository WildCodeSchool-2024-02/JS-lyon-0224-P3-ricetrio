// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

// Définition de la classe UserRepository qui hérite d'AbstractRepository
class UserRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractRepository)
    super({ table: "user" }); // Le nom de la table manipulée par ce repository est "user"
  }

  // Méthode pour créer un nouvel utilisateur dans la table "user"
  async create(user) {
    // Détermine le rôle de l'utilisateur en fonction de son adresse e-mail
    // Les utilisateurs avec l'email "admin@admin.com" reçoivent le rôle "admin", sinon "user"
    const role = user.email === "admin@admin.com" ? "admin" : "user";

    // Exécute la requête SQL INSERT pour ajouter un nouvel utilisateur avec les détails spécifiés
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (pseudo, email, hashed_password, role)
      VALUES (?, ?, ?, ?)
    `,
      [user.pseudo, user.email, user.password, role] // Les valeurs à insérer dans la table
    );

    // Retourne l'ID de l'entrée nouvellement insérée
    return result.insertId;
  }

  // Les opérations de lecture

  // Méthode pour lire un utilisateur spécifique par son ID
  async read(id) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur par son ID
    const [rows] = await this.database.query(
      `SELECT id, email, role FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne la première ligne du résultat, qui représente l'utilisateur
    return rows[0];
  }

  // Méthode pour lire tous les utilisateurs de la table "user"
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer tous les utilisateurs de la table "user"
    const [rows] = await this.database.query(
      `SELECT id, email, role FROM ${this.table}`
    );

    // Retourne le tableau de tous les utilisateurs
    return rows;
  }

  // Méthode pour lire un utilisateur spécifique par son pseudo, avec mot de passe
  async readByPseudoWithPassword(pseudo) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur par son pseudo
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE pseudo = ?`,
      [pseudo]
    );

    // Retourne les lignes obtenues qui contiennent les détails de l'utilisateur
    return rows;
  }
}

// Exporte la classe UserRepository pour l'utiliser dans d'autres parties de l'application
module.exports = UserRepository;
