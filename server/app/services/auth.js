const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.hashed_password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization" dans la requête
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("En-tête d'autorisation est manquante");
    }

    // Vérifier que l'en-tête a la forme "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("L'en-tête d'autorisation n'a pas le type 'Bearer'");
    }

    // Vérifier la validité du token (son authenticité et sa date d'expiration)
    // En cas de succès, le payload est extrait et décodé
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyCookie = (req, res, next) => {
  try {
    const token = req.cookies.access_token; // Récupération du token d'accès depuis les cookies de la requête
    if (!token) {
      return res.sendStatus(401); // Si aucun token n'est présent, renvoyer un statut 401 (non autorisé)
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET); // Vérification du token avec la clé secrète de l'application et stockage des informations d'authentification dans req.auth

    return next(); // Si la vérification réussit, passer à la prochaine étape du middleware
  } catch (err) {
    return res.status(404).send("Il y a eu une erreur"); // En cas d'erreur, renvoyer un statut 404 avec un message d'erreur
  }
};

const verifyIsAdmin = async (req, res, next) => {
  try {
    const { sub } = req.auth; // Extraction du "sub" (identifiant du sujet) à partir des informations d'authentification

    const userRole = await tables.user.findUserRole(sub); // Recherche du rôle de l'utilisateur dans la base de données
    if (userRole.role !== "admin") {
      return res
        .status(403)
        .json("Vous n'avez pas les droits pour effectuer cette action !"); // Si l'utilisateur n'est pas administrateur, renvoyer un statut 403 (interdit) avec un message d'erreur
    }

    return next(); // Si l'utilisateur est administrateur, passer à la prochaine étape du middleware
  } catch (err) {
    return res.status(404).send("Il y a eu une erreur"); // En cas d'erreur, renvoyer un statut 404 avec un message d'erreur
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  verifyCookie,
  verifyIsAdmin,
};
