const Joi = require("joi"); // Importation de Joi, une bibliothèque de validation pour JavaScript

// Définition d'un motif de validation pour les mots de passe
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

// Définition du schéma de validation pour la connexion (sign-in)
const signInSchema = Joi.object({
  pseudo: Joi.string().min(3).max(20).required(), // Le pseudo doit être une chaîne de caractères entre 3 et 20 caractères et est requis
  email: Joi.string().email().required(), // L'email doit être une adresse email valide et est requis
  password: Joi.string().pattern(passwordPattern).required(), // Le mot de passe doit correspondre au motif défini et est requis
  hashedPassword: Joi.string().required(), // Cette ligne valide que "hashedPassword" est requis, si nécessaire pour le schéma
});

// Middleware pour valider les données de la requête de connexion
const validateSignIn = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true }); // Validation des données de la requête en utilisant le schéma défini

  if (error !== null) {
    next(); // Si la validation est réussie (pas d'erreur), passer à l'étape suivante du middleware
  } else {
    res.status(400).json({ validationErrors: error.details }); // Si la validation échoue, renvoyer une réponse avec un statut 400 et les détails de l'erreur
  }
};

module.exports = validateSignIn; // Exportation du middleware de validation pour l'utiliser dans d'autres parties de l'application
