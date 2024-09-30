// Importation du module mysql2 avec la méthode promise pour la gestion des connexions à la base de données
const mysql = require("mysql2/promise");

// Récupération des variables d'environnement pour la connexion à la base de données
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Création d'un pool de connexions à la base de données
const client = mysql.createPool({
  host: DB_HOST, // Adresse du serveur de base de données
  port: DB_PORT, // Port de connexion à la base de données
  user: DB_USER, // Nom d'utilisateur pour la connexion à la base de données
  password: DB_PASSWORD, // Mot de passe pour la connexion à la base de données
  database: DB_NAME, // Nom de la base de données à utiliser
});

// Méthode pour vérifier la connexion à la base de données
client.checkConnection = () => {
  // Essaye d'obtenir une connexion à la base de données
  client
    .getConnection()
    .then((connection) => {
      // Si la connexion est réussie, affiche un message d'information
      console.info(`Utilisation de la base de données ${DB_NAME}`);
      // Libère la connexion après utilisation
      connection.release();
    })
    .catch((error) => {
      // Si la connexion échoue, affiche un message d'avertissement
      console.warn(
        "Attention :",
        "Échec de l'établissement de la connexion à la base de données.",
        "Veuillez vérifier vos identifiants de base de données dans le fichier .env si vous avez besoin d'un accès à la base de données."
      );
      // Affiche le message d'erreur spécifique
      console.warn(error.message);
    });
};

// Stocke le nom de la base de données dans le client pour une utilisation ultérieure
client.databaseName = DB_NAME;

// Prêt à être exporté
module.exports = client;
