const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe abstraite 'AbstractSeeder' pour être étendue

// Définition de la classe RequestSeeder qui hérite de AbstractSeeder
class RequestSeeder extends AbstractSeeder {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractSeeder) avec des options spécifiques
    super({ table: "request", truncate: true }); // Le nom de la table est "request" et l'option "truncate" est activée pour vider la table avant d'insérer les données
  }

  // Méthode asynchrone pour exécuter le seeding des requêtes dans la base de données
  async run() {
    const requests = [
      {
        request: "", // Un exemple de requête avec un champ vide
      },
    ];

    // Parcours du tableau 'requests' pour insérer chaque objet 'request' dans la base de données
    requests.forEach((request) => {
      this.insert(request); // Utilisation de la méthode 'insert' héritée d'AbstractSeeder pour insérer les données dans la table
    });
  }
}

module.exports = RequestSeeder; // Exportation de la classe RequestSeeder pour l'utiliser dans d'autres parties de l'application
