import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditFilm() {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [editMode] = useState(id !== undefined); // if id is undefined, it means that you want to create a new film. If id exists, it means this is a film you want to update

  const [values, setValues] = useState({
    title: "",
    genre: "",
    duration: "",
    overview: "",
    id: "",
  });

  // ------------------------- For edit  -----------------------
  useEffect(() => {
    // Execute the following code only if you have an id in order to update the film
    if (editMode) {
      fetch(`${api}/api/films/${id}`) // Fetch the film with a given id
        .then((response) => response.json())
        .then((data) => {
          setValues({ 
            title: data.title,
            genre: data.genre,
           }); // Replace values from the empty form by values from the film we just got
        })
        .catch((error) => console.error("Error fetching the film:", error));
    }

  }, [api, editMode, id]);

  const handleUpdateForm = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 
  const handleFilms = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/api/films/2`, {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        const { insertId } = await response.json();
        navigate(`/api/films/${insertId}`);
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
        value={values.title}
        onChange={handleUpdateForm}
      />
      <input
        type="text"
        name="genre"
        value={values.genre}
        onChange={handleUpdateForm}
      />
      <button type="submit">
        <h3>Sauvegarder les modifications</h3>
      </button>
    </form>
  );
}

export default EditFilm;
