const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByPseudoWithPassword(req.body.pseudo);
    if (user === null) {
      res.sendStatus(422);
      return;
    }
    // Vérifier le mot de passe fourni par l'utilisateur avec le mot de passe haché stocké
    const verified = await argon2.verify(
      user[0].hashed_password,
      req.body.password
    );
    // supprimer le mot de passe haché de l'objet utilisateur pour des raisons de sécurité.
    if (verified === true) {
      delete user[0].hashed_password;
      // nous créons du token quand un utilisateur se connecte, il crée un JWT avec jwt.sign. Le token contient 3 choses ci-dessous :
      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin }, // sub: le numéro unique de l'utilisateur et isAdmin : si l'utilisateur est administrateur ou non
        // Nous signons le token avec une clé secrète “.env.APP_SECRET” sur .env et nous le faison expirer après une heure
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("access_token", token, {
        httpOnly: true, // Empêche JavaScript de lire le cookie
        maxAge: 3600000, // Le cookie dure une heure
        secure: process.env.NODE_ENV === "production", // N'envoie le cookie que sur HTTPS
        sameSite: "Strict", // Limite l'envoi du cookie au même site
        path: "/", //  Le cookie marche sur tout le site
      });
      // supprimer les informations sensibles de l'objet utilisateur avant de les renvoyer au client dans la réponse.
      delete user.password;
      delete user.id;

      res
        .json({
          user,
        })
        .status(200);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};
// La fonction de déconnexion du code est conçue pour effacer le jeton d'authentification stocké dans les cookies du client, puis pour envoyer un code d'état HTTP de 200, indiquant que l'opération a réussi.
const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

module.exports = {
  login,
  logout,
};
