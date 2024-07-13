const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const contact = await tables.contact.readAll();
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

const requestFilm = async (req, res, next) => {
  const dataRequest = req.body;

  try {
    const result = await tables.contact.create(dataRequest);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating like:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the favorite" });
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  requestFilm,
};
