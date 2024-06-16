const fs = require("fs");

const Papa = require("papaparse");

const AbstractSeeder = require("./AbstractSeeder");

class FilmSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "film", truncate: true });
  }

  run() {
    const csvFile = fs.readFileSync("public/assets/films.csv", "utf8");
    const csv = Papa.parse(csvFile);

    for (let i = 1; i < csv.data.length; i += 1) {
      const row = csv.data[i];

      const films = {
        nom: row[1],
        genre: row[2],
        sortie: row[4],
        synopsis: row[6],
        poster: row[8],
        lien: row[10],
        youtube: row[11],
      };

      this.insert(films);
    }
  }
}
module.exports = FilmSeeder;
