const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    console.info("coucou");
    console.info(req.body);
    console.info(req.body.pseudo);
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByPseudoWithPassword(req.body.pseudo);
    console.info(user);
    if (user === null) {
      res.sendStatus(422);
      return;
    }

    console.info("coucou2");
    console.info(user[0].hashed_password);
    console.info(req.body.password);

    const verified = await argon2.verify(
      user[0].hashed_password,
      req.body.password
    );

    if (verified === true) {
      // Respond with the user and a signed token in JSON format (but without the hashed password)
      delete user[0].hashed_password;
      // res.status(201).json({ id: user.id });
      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.info("APP_SECRET:", process.env.APP_SECRET);
      console.info("Generated JWT token:", token);

      res
        .json({
          token,
          user,
        })
        .status(200);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
};
