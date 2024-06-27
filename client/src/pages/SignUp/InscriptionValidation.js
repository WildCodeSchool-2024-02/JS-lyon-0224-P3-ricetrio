function Validation(values) {
  const errors = {};
  const pseudoPattern = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$/;

  if (values.pseudo.trim() === "") {
    errors.pseudo = "Le pseudo est requis";
  } else if (!pseudoPattern.test(values.pseudo)) {
    errors.pseudo = "Le pseudo n'est pas valide";
  }

  if (values.email.trim() === "") {
    errors.email = "L'email est requis";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "L'email n'est pas valide";
  }

  if (values.password.trim() === "") {
    errors.password = "Le mot de passe est requis";
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre";
  } else if (values.password.trim().length > 255) {
    errors.password = "Le mot de passe ne doit pas dépasser 255 caractères";
  }

  return errors;
}

export default Validation;
