function ValidationFilm(values) {
  const errors = {};

  if (values.movie_key === undefined || values.movie_key.trim() === "") {
    errors.movie_key = "La clé du film est requise";
  }

  if (values.title === undefined || values.title.trim() === "") {
    errors.title = "Le titre est requis";
  }

  if (values.genre === undefined || values.genre.trim() === "") {
    errors.genre = "Le genre est requis";
  }

  if (values.duration === undefined || values.duration.trim() === "") {
    errors.duration = "La durée du film est requise";
  }

  if (values.release_date === undefined || values.release_date.trim() === "") {
    errors.release_date = "La date de sortie est requise";
  }

  if (values.overview === undefined || values.overview.trim() === "") {
    errors.overview = "Le résumé est requis";
  }

  if (
    values.movie_director === undefined ||
    values.movie_director.trim() === ""
  ) {
    errors.movie_director = "Le.a réalisateur.ice est requis.e";
  }

  if (values.poster_link === undefined || values.poster_link.trim() === "") {
    errors.poster_link = "Le poster du film est requis";
  }

  if (values.key_trailer === undefined || values.key_trailer.trim() === "") {
    errors.key_trailer = "La clé du trailer est requise";
  }

  if (values.trailer_url === undefined || values.trailer_url.trim() === "") {
    errors.trailer_url = "La bande annonce est requise";
  }

  if (values.freemium === undefined || values.freemium.trim() === "") {
    errors.freemium = "La donnée est requise";
  }

  return errors;
}

export default ValidationFilm;
