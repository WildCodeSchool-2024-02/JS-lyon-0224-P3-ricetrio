require("dotenv").config();

const AbstractSeeder = require("./AbstractSeeder");

class VideoSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "video", truncate: true });
    this.apiKey = process.env.API_KEY;
  }

  async run() {
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
    Authorization: this.apiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok === true) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.info(data);

      // Insérer les films dans la base de données
      // Extraire les titres des films
      const titles = data.results.map((movie) => movie.poster_path);

      // Insérer les titres dans la base de données
      titles.map((poster) =>
        this.insert({
          poster,
        })
      );

      console.info("Data inserted successfully.");
    } catch (err) {
      console.error("Error fetching and inserting movies:", err);
    }
  }
}

module.exports = VideoSeeder;
