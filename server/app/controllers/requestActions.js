const tables = require("../../database/tables");
const RequestRepository = require("../../database/models/RequestRepository");

// Instanciation d'un nouvel objet RequestRepository
const requestRepository = new RequestRepository();
// Fonction pour parcourir toutes les demandes (BROWSE dans BREAD)
const browse = async (req, res, next) => {
  try {
    const request = await tables.request.readAll(); // Lecture de toutes les demandes à partir de la base de données
    res.json(request); // Envoi des demandes en réponse au client au format JSON
  } catch (err) {
    next(err); // Transmission de l'erreur au middleware suivant pour la gestion des erreurs
  }
};
// Fonction pour lire une demande spécifique par ID (READ dans BREAD)
const read = async (req, res) => {
  try {
    const request = await requestRepository.read(req.params.id); // Lecture d'une demande spécifique à partir de l'ID fourni dans les paramètres de la requête
    if (!request === true) {
      // Vérification si la demande existe
      res.status(404).json({ error: "Requête non trouvée" }); // Envoi d'un statut 404 si la demande n'est pas trouvée
      return;
    }
    res.json(request); // Envoi de la demande en réponse au client au format JSON
  } catch (error) {
    res.status(400).json({ error: "Échec de la demande de film" }); // Envoi d'un statut 400 en cas d'échec de la lecture
  }
};
// Fonction pour ajouter une nouvelle demande (ADD dans BREAD)
const add = async (req, res, next) => {
  const request = req.body; // Extraction des données de la demande depuis le corps de la requête
  try {
    // Créer un nouvel request
    const insertId = await tables.request.create(request); // Création de la nouvelle demande dans la base de données

    res.status(201).json({ insertId }); // Envoi d'un statut 201 (créé) avec l'ID de la demande insérée
  } catch (err) {
    console.error("Erreur dans la fonction d'ajout:", err); // Log de l'erreur pour le débogage
    res.status(500).json(); // Envoi d'un statut 500 (erreur serveur) en cas d'échec de l'ajout
    next(err); // Transmission de l'erreur au middleware suivant pour la gestion des erreurs
  }
};

module.exports = {
  browse,
  read,
  add,
};
