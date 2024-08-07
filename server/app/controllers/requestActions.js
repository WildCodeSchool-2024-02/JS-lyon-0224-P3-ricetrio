const tables = require("../../database/tables");
const RequestRepository = require("../../database/models/RequestRepository");

const requestRepository = new RequestRepository();

const browse = async (req, res, next) => {
  try {
    const request = await tables.request.readAll();
    res.json(request);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res) => {
  try {
    const request = await requestRepository.read(req.params.id);
    if (!request === true) {
      res.status(404).json({ error: "request not found" });
      return;
    }
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: "Failed to request film" });
  }
};

const add = async (req, res, next) => {
  const request = req.body;
  try {
    const insertId = await tables.request.create(request);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Error in add function:", err);
    res.status(500).json();
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
};
