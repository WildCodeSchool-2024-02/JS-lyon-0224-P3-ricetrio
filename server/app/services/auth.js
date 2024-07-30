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
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    return next();
  } catch (err) {
    return res.status(404).send("Il y a eu une erreur");
  }
};

const verifyIsAdmin = async (req, res, next) => {
  try {
    const { sub } = req.auth;

    const userRole = await tables.user.findUserRole(sub);
    if (userRole.role !== "admin") {
      return res
        .status(403)
        .json("Vous n'avez pas les droits pour effectuer cette action !");
    }

    return next();
  } catch (err) {
    return res.status(404).send("Il y a eu une erreur");
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  verifyCookie,
  verifyIsAdmin,
};
