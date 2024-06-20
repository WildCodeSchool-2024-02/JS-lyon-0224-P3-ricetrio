const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        pseudo: "Adeline",
        email: "adeline@adeline.com",
        password: "Adelinedu69",
      },
      {
        pseudo: "Kana",
        email: "kana@kana.com",
        password: "Kanadu69",
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
