const argon2 = require("argon2");

// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    // Hash the password before creating the user
    const hashedPassword = await argon2.hash(user.password);
    // Replace the plain text password with the hashed password
    user.password = hashedPassword;

    // Create a new user with the hashed password
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId }); // Respond with the created user's ID
  } catch (err) {
    console.error("Erreur dans la fonction d'ajout", err);
    res.status(500).json();
    next(err);
  }
};

// Ready to export the controller functions

module.exports = {
  browse,
  read,
  add,
};
