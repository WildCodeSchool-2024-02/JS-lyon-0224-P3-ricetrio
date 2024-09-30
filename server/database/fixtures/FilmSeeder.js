const fs = require("fs"); // Importation du module 'fs' pour lire les fichiers du système de fichiers
const papa = require("papaparse"); // Importation de 'papaparse', une bibliothèque pour analyser les fichiers CSV
const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe abstraite 'AbstractSeeder' qui sera étendue

// Définition de la classe FilmSeeder qui hérite de AbstractSeeder
class FilmSeeder extends AbstractSeeder {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractSeeder) avec des options spécifiques
    super({ table: "film", truncate: true }); // Le nom de la table est "film" et l'option "truncate" est activée pour vider la table avant d'insérer les données
  }

  // Méthode pour exécuter le seeding des films dans la base de données
  run() {
    const csvFile = fs.readFileSync(
      "public/assets/films_sans_key_words.csv",
      "utf8"
    ); // Lecture du fichier CSV contenant les données des films
    const csv = papa.parse(csvFile); // Analyse du fichier CSV en un tableau de données

    for (let i = 1; i < csv.data.length; i += 1) {
      const row = csv.data[i]; // Récupération de chaque ligne du tableau de données (à partir de la 2e ligne pour ignorer l'en-tête)

      const films = {
        movie_key: row[0], // Clé unique du film
        title: row[1], // Titre du film
        genre: row[2], // Genre du film
        duration: row[3], // Durée du film
        release_date: row[4], // Date de sortie du film
        overview: row[6], // Résumé du film
        movie_director: row[7], // Réalisateur du film
        poster_link: row[8], // Lien vers l'affiche du film
        key_trailer: row[9], // Clé unique de la bande-annonce
        trailer_url: row[10], // URL de la bande-annonce
        freemium: row[11], // Statut freemium (gratuit/payant)
        background_img: row[12], // Image de fond pour le film
      };

      this.insert(films); // Insertion de l'objet 'films' dans la base de données en utilisant la méthode 'insert' héritée d'AbstractSeeder
    }
  }
}

module.exports = FilmSeeder; // Exportation de la classe FilmSeeder pour l'utiliser dans d'autres parties de l'application
