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

const add = async (req, res, next) => {
  const user = req.body;
  try {
    // Hash the password before creating the user
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword; // Replace the plain text password with the hashed password

    // Create a new user with the hashed password
    const insertId = await tables.user.create(user);

    res.status(201).json(insertId); // Respond with the created user's ID
  } catch (err) {
    console.error("Error in add function:", err);
    res.status(400).json("Les champs ne sont pas correctement remplis");
    res.status(500).json();
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  add,
};
