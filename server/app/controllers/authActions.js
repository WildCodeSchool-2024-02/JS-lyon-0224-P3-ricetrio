const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    console.info(req.body);
    console.info(req.body.pseudo);
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByPseudoWithPassword(req.body.pseudo);
    console.info(user);
    if (user === null) {
      res.sendStatus(422);
      return;
    }

    console.info(user[0].hashed_password);
    console.info(req.body.password);

    const verified = await argon2.verify(
      user[0].hashed_password,
      req.body.password
    );

    if (verified === true) {
      delete user[0].hashed_password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
      });

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

module.exports = {
  login,
};
