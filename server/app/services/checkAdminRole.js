const checkAdminRole = (req, res, next) => {
  const { role } = req.body;

  if (role === "admin") {
    res.status(201).json({ message: "Accès autorisé" });
    console.info("COUCOU");
    next();
  } else {
    res.status(403).json({ message: "Accès non autorisé" });
  }
};

module.exports = checkAdminRole;
