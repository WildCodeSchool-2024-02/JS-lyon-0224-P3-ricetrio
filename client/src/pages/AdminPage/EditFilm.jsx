import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditFilm() {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const editMode = id !== undefined; // Determine edit mode based on the presence of an id

  const [newFilm, setNewFilm] = useState({
    title: "",
    genre: "",
    duration: "",
    release_date: "",
    overview: "",
    movie_director: "",
    poster_link: "",
    key_trailer: "",
    trailer_url: "",
    freemium: "",
    background_img: "",
    id: "",
  });

  useEffect(() => {
    if (editMode) {
      fetch(`${api}/api/films/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedDate = data.release_date.split("T")[0];
          setNewFilm({
            title: data.title,
            genre: data.genre,
            duration: data.duration,
            release_date: formattedDate,
            overview: data.overview,
            movie_director: data.movie_director,
            poster_link: data.poster_link,
            key_trailer: data.key_trailer,
            trailer_url: data.trailer_url,
            freemium: data.freemium,
            background_img: data.background_img,
            id: data.id,
          });
        })
        .catch((error) => console.error("Error fetching the film:", error));
    }
  }, [api, editMode, id]);

  const handleUpdateForm = (e) => {
    setNewFilm({ ...newFilm, [e.target.name]: e.target.value });
  };

  const handleFilms = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/api/films/${editMode ? id : ""}`, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFilm),
      });

      if (response.ok) {
        navigate(`/bandeannonce/${id}`);
      } else {
        console.error(`Error: Received status code ${response.status}`);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <form method="put" onSubmit={handleFilms}>
      <input
        type="text"
        name="title"
        value={newFilm.title}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="genre"
        value={newFilm.genre}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="duration"
        value={newFilm.duration}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="release_date"
        value={newFilm.release_date}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="overview"
        value={newFilm.overview}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="movie_director"
        value={newFilm.movie_director}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="poster_link"
        value={newFilm.poster_link}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="key_trailer"
        value={newFilm.key_trailer}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="trailer_url"
        value={newFilm.trailer_url}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="freemium"
        value={newFilm.freemium}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="background_img"
        value={newFilm.background_img}
        onChange={handleUpdateForm}
      />
      <button type="submit">
        <h3>Sauvegarder les modifications</h3>
      </button>
    </form>
  );
}

export default EditFilm;
