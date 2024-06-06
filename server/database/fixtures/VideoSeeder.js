const AbstractSeeder = require("./AbstractSeeder");

class VideoSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "video", truncate: true });
  }

  // The run method - Populate the 'item' table with fake data

  run() {
    this.insert({ title: "cat movie 1", id: 1 });
    this.insert({ title: "cat movie 2", id: 2 });
  }
}

// Export the ItemSeeder class
module.exports = VideoSeeder;
