// Fonction de validation des valeurs du formulaire d'inscription
function Validation(values) {
  const errors = {}; // Initialisation de l'objet des erreurs

  // Définition des motifs pour la validation des champs
  const pseudoPattern = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

  // Validation du pseudo
  if (values.pseudo.trim() === "") {
    errors.pseudo = "Le pseudo est requis"; // Vérifie si le pseudo est vide
  } else if (!pseudoPattern.test(values.pseudo)) {
    errors.pseudo = "Le pseudo n'est pas valide"; // Vérifie si le pseudo respecte le motif
  }

  // Validation de l'email
  if (values.email.trim() === "") {
    errors.email = "L'email est requis"; // Vérifie si l'email est vide
  } else if (!emailPattern.test(values.email)) {
    errors.email = "L'email n'est pas valide"; // Vérifie si l'email respecte le motif
  }

  // Validation du mot de passe
  if (values.password.trim() === "") {
    errors.password = "Le mot de passe est requis"; // Vérifie si le mot de passe est vide
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre"; // Vérifie si le mot de passe respecte le motif
  } else if (values.password.trim().length > 255) {
    errors.password = "Le mot de passe ne doit pas dépasser 255 caractères"; // Vérifie si le mot de passe dépasse 255 caractères
  }

  return errors; // Retourne l'objet des erreurs
}

export default Validation; // Exportation de la fonction de validation
