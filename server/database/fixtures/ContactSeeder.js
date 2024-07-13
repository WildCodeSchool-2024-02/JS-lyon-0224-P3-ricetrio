const AbstractSeeder = require("./AbstractSeeder");

class ContactSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "contact", truncate: true });
  }

  run() {
    const contacts = [
      {
        request: "",
      },
    ];

    contacts.forEach((contact) => {
      this.insert(contact);
    });
  }
}

module.exports = ContactSeeder;
