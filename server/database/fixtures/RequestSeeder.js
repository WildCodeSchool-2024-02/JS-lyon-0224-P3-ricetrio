const AbstractSeeder = require("./AbstractSeeder");

class RequestSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "request", truncate: true });
  }

  async run() {
    const requests = [
      {
        request: "",
      },
    ];

    requests.forEach((request) => {
      this.insert(request);
    });
  }
}

module.exports = RequestSeeder;
