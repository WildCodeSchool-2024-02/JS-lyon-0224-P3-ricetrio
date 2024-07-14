const tables = require ("../../database/tables");

const browse = async (req, res, next) => {
    try {
        const favorite = await tables.favorite.readAll();
        res.json(favorite);
    } catch (err) {
    next(err);
}
};

const like = async (req, res, next) => {
    const dataLike = req.body;
    try {
        const result = await tables.favorite.create(dataLike);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating like:", err);
        res
        .status (500)
        .json ({ error: req.body });
    next(err);
  }
};


// const add = async (req, res, next) => {
//     try {
//       const favoriteAdd = req.body;
//       // Créer un favori
//       const insertId = await tables.favorite.create(favoriteAdd);
  
//       res.status(201).json(insertId); // Répondre avec l'utilisateur créé
//     } catch (err) {
//       console.error("Error in add function:", err);
//       res.status(500).json();
//       next(err);
//     }
//   };


// Ready to export the controller functions
module.exports = {
  browse,
  like,
//   add,
};