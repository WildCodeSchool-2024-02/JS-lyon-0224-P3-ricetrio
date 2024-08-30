const AbstractSeeder = require("./AbstractSeeder"); // Importation de la classe abstraite 'AbstractSeeder' pour être étendue

// Définition de la classe UserSeeder qui hérite de AbstractSeeder
class UserSeeder extends AbstractSeeder {
  constructor() {
    // Appel du constructeur de la classe parente (AbstractSeeder) avec des options spécifiques
    super({ table: "user", truncate: true }); // Le nom de la table est "user" et l'option "truncate" est activée pour vider la table avant d'insérer les données
  }

  // Méthode pour exécuter le seeding des utilisateurs dans la base de données
  run() {
    const users = [
      {
        pseudo: "", // Champ pour le pseudo de l'utilisateur
        email: "", // Champ pour l'adresse email de l'utilisateur
        hashed_password: "", // Champ pour le mot de passe haché de l'utilisateur
        role: "", // Champ pour le rôle de l'utilisateur (par exemple, "admin", "user")
      },
    ];

    // Parcours du tableau 'users' pour insérer chaque objet 'user' dans la base de données
    users.forEach((user) => {
      this.insert(user); // Utilisation de la méthode 'insert' héritée d'AbstractSeeder pour insérer les données dans la table
    });
  }
}

module.exports = UserSeeder; // Exportation de la classe UserSeeder pour l'utiliser dans d'autres parties de l'application
