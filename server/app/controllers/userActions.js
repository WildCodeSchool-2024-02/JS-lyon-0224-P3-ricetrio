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
  try {
    console.log("Request body:", req.body);
    const user = req.body;
    // Hash the password before creating the user
    user.password = req.body.hashedPassword; // Replace the plain text password with the hashed password

    // Create a new user with the hashed password
    const insertId = await tables.user.create(user);

    res.status(201).json(insertId); // Respond with the created user's ID
  } catch (err) {
    console.error("Error in add function:", err);
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  add,
};
