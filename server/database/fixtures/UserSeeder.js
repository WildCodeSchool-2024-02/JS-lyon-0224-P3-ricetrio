const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        pseudo: "",
        email: "",
        hashed_password: "",
        role: "",
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
