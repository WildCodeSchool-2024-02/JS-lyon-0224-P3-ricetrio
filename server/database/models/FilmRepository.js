const AbstractRepository = require("./AbstractRepository"); // Importation de la classe AbstractRepository

// Définition de la classe filmRepository qui hérite d'AbstractRepository
class filmRepository extends AbstractRepository {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractRepository)
    // et passage du nom de la table "film" comme configuration
    super({ table: "film" });
  }

  // Méthode pour lire un film spécifique par son ID
  async read(id) {
    // Exécute la requête SQL SELECT pour récupérer un élément spécifique par son ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Retourne la première ligne du résultat, qui représente l'élément (le film)
    return rows[0];
  }

  // Méthode pour lire tous les films de la table "film"
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer tous les films de la table "film"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retourne le tableau de films
    return rows;
  }

  // Méthode pour créer un nouveau film dans la table "film"
  async create(filmAdd) {
    // Exécute la requête SQL INSERT pour ajouter un nouveau film avec les détails spécifiés
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (movie_key, title, genre, duration, release_date, overview, movie_director, poster_link, key_trailer, trailer_url, freemium, background_img)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        filmAdd.movie_key, // Clé du film
        filmAdd.title, // Titre du film
        filmAdd.genre, // Genre du film
        filmAdd.duration, // Durée du film
        filmAdd.release_date, // Date de sortie du film
        filmAdd.overview, // Résumé du film
        filmAdd.movie_director, // Réalisateur du film
        filmAdd.poster_link, // Lien de l'affiche du film
        filmAdd.key_trailer, // Clé du trailer du film
        filmAdd.trailer_url, // URL du trailer du film
        filmAdd.freemium, // Indicateur si le film est en freemium
        filmAdd.background_img, // Image de fond associée au film
      ]
    );

    // Retourne l'ID de l'entrée nouvellement insérée
    return result.insertId;
  }

  // Méthode pour mettre à jour un film existant dans la table "film"
  async update(film) {
    // Exécute la requête SQL UPDATE pour mettre à jour les détails d'un film existant
    const [result] = await this.database.query(
      `update ${this.table} SET title = ?, genre = ?, duration = ?, release_date = ?, overview = ?, movie_director = ?, poster_link = ?, key_trailer = ?, trailer_url = ?, freemium = ?, background_img = ? where id = ?`,
      [
        film.title, // Mise à jour du titre
        film.genre, // Mise à jour du genre
        film.duration, // Mise à jour de la durée
        film.release_date, // Mise à jour de la date de sortie
        film.overview, // Mise à jour du résumé
        film.movie_director, // Mise à jour du réalisateur
        film.poster_link, // Mise à jour du lien de l'affiche
        film.key_trailer, // Mise à jour de la clé du trailer
        film.trailer_url, // Mise à jour de l'URL du trailer
        film.freemium, // Mise à jour de l'indicateur freemium
        film.background_img, // Mise à jour de l'image de fond
        film.id, // ID du film à mettre à jour
      ]
    );

    return result; // Retourne le résultat de la mise à jour
  }

  // Méthode pour supprimer un film de la table "film" par son ID
  async delete(id) {
    // Exécute la requête SQL DELETE pour supprimer un film par son ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result; // Retourne le résultat de la suppression
  }
}

// Exportation de la classe filmRepository pour utilisation dans d'autres parties de l'application
module.exports = filmRepository;
