const VideoRepository = require("../../database/models/VideoRepository");

const videoRepository = new VideoRepository();

const browse = async (req, res) => {
  try {
    const videos = await videoRepository.readAll();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

const read = async (req, res) => {
  try {
    const video = await videoRepository.read(req.params.id);
    if (!video === true) {
      res.status(404).json({ error: "Video not found" });
      return; // Ajout d'un retour explicite après l'envoi de la réponse
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

const add = async (req, res) => {
  try {
    const { title, id } = req.body;
    const insertId = await videoRepository.create({ title, id });
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add video" });
  }
};

module.exports = {
  browse,
  read,
  add,
};
