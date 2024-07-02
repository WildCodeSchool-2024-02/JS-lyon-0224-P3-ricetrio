const fs = require("fs");

const papa = require("papaparse");

const AbstractSeeder = require("./AbstractSeeder");

class FilmSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "film", truncate: true });
  }

  run() {
    const csvFile = fs.readFileSync(
      "public/assets/films_sans_key_words.csv",
      "utf8"
    );
    const csv = papa.parse(csvFile);

    for (let i = 1; i < csv.data.length; i += 1) {
      const row = csv.data[i];

      const films = {
        movie_key: row[0],
        title: row[1],
        genre: row[2],
        duration: row[3],
        release_date: row[4],
        overview: row[6],
        movie_director: row[7],
        poster_link: row[8],
        key_trailer: row[9],
        trailer_url: row[10],
        freemium: row[11],
        background_img: row[12],
      };

      this.insert(films);
    }
  }
}
module.exports = FilmSeeder;
