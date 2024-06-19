const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const add = async (req, res, next) => {
  // Extract the category data from the request body
  const user = req.body;

  try {
    // Insert the category into the database
    const insertId = await tables.user.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted category
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  add,
};
