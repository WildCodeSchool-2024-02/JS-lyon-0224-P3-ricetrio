/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("../client");

// Declare an object to store created objects from their names
const refs = {};

// Provide faker access through AbstractSeed class
class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    // thx https://www.codeheroes.fr/2017/11/08/js-classes-abstraites-et-interfaces/
    if (this.constructor === AbstractSeeder) {
      throw new TypeError(
        "La classe abstraite 'AbstractSeed' ne peut pas être instanciée directement"
      );
    }

    this.table = table;

    this.truncate = truncate;

    this.dependencies = dependencies;

    this.promises = [];

    this.faker = faker;
    this.refs = refs;
  }

  async #doInsert(data) {
    // Extract ref name (if it exists)
    const { refName, ...values } = data;

    // Prepare the SQL statement: "insert into <table>(<fields>) values (<placeholders>)"
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length)
      .fill("?")
      .join(",");

    const sql = `insert into ${this.table}(${fields}) values (${placeholders})`;

    // Perform the query and if applicable store the insert id given the ref name
    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      refs[refName] = { ...values, insertId };
    }
  }

  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  // eslint-disable-next-line class-methods-use-this
  run() {
    throw new Error("Vous devez implémenter cette fonction");
  }

  // eslint-disable-next-line class-methods-use-this
  getRef(name) {
    return refs[name];
  }
}

// Ready to export
module.exports = AbstractSeeder;
