const express = require("express"); // Importation d'Express, un framework pour créer des applications web en Node.js

const router = express.Router(); // Création d'un routeur Express pour définir des routes spécifiques

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");
const { read } = require("../../../controllers/userActions");
const {
  verifyToken,
  verifyCookie,
  verifyIsAdmin,
} = require("../../../services/auth");

router.post("/", login); // Route POST pour gérer la connexion (login)
router.get("/:id", verifyToken, read); // Route GET pour lire les informations d'un utilisateur, avec vérification du token
router.get("/admin", verifyCookie, verifyIsAdmin); // Route GET pour accéder aux fonctionnalités administratives, avec vérification du cookie et des droits administratifs

/* ************************************************************************* */

module.exports = router;
