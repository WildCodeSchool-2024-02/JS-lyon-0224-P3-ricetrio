function Validation(values) {
  const error = {};
  const pseudoPattern = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/; // doit commencer par une lettre peut contenir lettre et chiffre et entre 3 et 16 carac
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.pseudo === "") {
    error.pseudo = "Le pseudo est requis";
  } else if (!pseudoPattern.test(values.pseudo) === true) {
    error.pseudo = "Le pseudo n'est pas valide";
  }

  if (values.email === "") {
    error.email = "L'email est requis";
  } else if (!emailPattern.test(values.email) === true) {
    error.email = "L'email n'est pas valide";
  }

  if (values.password === "") {
    error.password = "Le mot de passe est requis";
  } else if (!passwordPattern.test(values.password) === true) {
    error.password =
      "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre";
  }

  return error;
}

export default Validation;
