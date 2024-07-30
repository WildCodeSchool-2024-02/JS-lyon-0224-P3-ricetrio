// Fonction de validation pour les champs du formulaire de création de film
function ValidationFilm(values) {
  const errors = {}; // Initialisation de l'objet pour stocker les erreurs

  // Vérification de la clé du film
  if (values.movie_key === undefined || values.movie_key.trim() === "") {
    errors.movie_key = "La clé du film est requise";
  }

  // Vérification du titre du film
  if (values.title === undefined || values.title.trim() === "") {
    errors.title = "Le titre est requis";
  }

  // Vérification du genre du film
  if (values.genre === undefined || values.genre.trim() === "") {
    errors.genre = "Le genre est requis";
  }

  // Vérification de la durée du film
  if (values.duration === undefined || values.duration.trim() === "") {
    errors.duration = "La durée du film est requise";
  }

  // Vérification de la date de sortie du film
  if (values.release_date === undefined || values.release_date.trim() === "") {
    errors.release_date = "La date de sortie est requise";
  }

  // Vérification du résumé du film
  if (values.overview === undefined || values.overview.trim() === "") {
    errors.overview = "Le résumé est requis";
  }

  // Vérification du réalisateur du film
  if (
    values.movie_director === undefined ||
    values.movie_director.trim() === ""
  ) {
    errors.movie_director = "Le.a réalisateur.ice est requis.e";
  }

  // Vérification du lien du poster du film
  if (values.poster_link === undefined || values.poster_link.trim() === "") {
    errors.poster_link = "Le poster du film est requis";
  }

  // Vérification de la clé du trailer du film
  if (values.key_trailer === undefined || values.key_trailer.trim() === "") {
    errors.key_trailer = "La clé du trailer est requise";
  }

  // Vérification du lien de la bande annonce du film
  if (values.trailer_url === undefined || values.trailer_url.trim() === "") {
    errors.trailer_url = "La bande annonce est requise";
  }

  // Vérification de la donnée freemium du film
  if (values.freemium === undefined || values.freemium.trim() === "") {
    errors.freemium = "La donnée est requise";
  }

  return errors; // Retourne l'objet contenant les erreurs
}

export default ValidationFilm; // Exportation de la fonction de validation
