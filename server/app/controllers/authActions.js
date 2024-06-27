const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByEmailWithPassword(req.body.pseudo);
    console.log(user);
    if (user === null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified === true) {
      // Respond with the user and a signed token in JSON format (but without the hashed password)
      // delete user.hashed_password;

      const token = await jwt.sign(
        { sub: user.id, role: user.role },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log("APP_SECRET:", process.env.APP_SECRET);
      console.log("Generated JWT token:", token);

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
