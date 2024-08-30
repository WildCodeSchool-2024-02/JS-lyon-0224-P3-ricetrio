const AbstractRepository = require("./AbstractRepository"); // Importation de la classe AbstractRepository

// Définition de la classe RequestRepository qui hérite d'AbstractRepository
class RequestRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractRepository)
    super({ table: "request" }); // Le nom de la table manipulée par ce repository est "request"
  }

  // Méthode pour lire une demande spécifique par son ID
  async read(id) {
    // Exécute la requête SQL SELECT pour récupérer un élément spécifique par son ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0]; // Retourne la première ligne du résultat, qui représente l'élément demandé
  }

  // Méthode pour créer une nouvelle demande dans la table "request"
  async create(request) {
    // Exécute la requête SQL INSERT pour ajouter une nouvelle demande avec les détails spécifiés
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (request) VALUES (?)`,
      [request.request] // Valeur de la demande à insérer
    );
    // Retourne l'ID de l'entrée nouvellement insérée
    return result.insertId;
  }

  // Méthode pour lire toutes les demandes de la table "request"
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer toutes les lignes de la table "request"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows; // Retourne le tableau de toutes les demandes
  }
}

module.exports = RequestRepository; // Exporte la classe RequestRepository pour l'utiliser dans d'autres parties de l'application
