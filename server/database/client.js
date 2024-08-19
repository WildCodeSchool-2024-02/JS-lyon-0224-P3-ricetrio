// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection pool to the database
const mysql = require("mysql2/promise");

const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client.checkConnection = () => {
  // Try to get a connection to the database
  client
    .getConnection()
    .then((connection) => {
      console.info(`Using database ${DB_NAME}`);

      connection.release();
    })
    .catch((error) => {
      console.warn(
        "Attention :",
        "Échec de l'établissement de la connexion à la base de données.",
        "Veuillez vérifier vos identifiants de base de données dans le fichier .env si vous avez besoin d'un accès à la base de données."
      );
      console.warn(error.message);
    });
};

// Store database name into client for further uses
client.databaseName = DB_NAME;

// Ready to export
module.exports = client;
