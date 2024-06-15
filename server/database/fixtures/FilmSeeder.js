const fs = require("fs");

const Papa = require("papaparse");

const AbstractSeeder = require("./AbstractSeeder");

class FilmSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "film", truncate: true });
  }

  run() {
    const csvFile = fs.readFileSync("public/assets/film.csv", "utf8");
    const csv = Papa.parse(csvFile);

    for (let i = 1; i < csv.data.length; i += 1) {
      const row = csv.data[i];

      const film = {
        name: row[1],
        genre: row[3],
        release: row[5],
        synopsis: row[10],
        poster: row[12],
        key: row[16],
        url: row[17],
      };

      this.insert(film);
    }
  }
}
module.exports = FilmSeeder;
