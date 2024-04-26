const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "Post1234",
  host: "localhost",
  port: 5432, // Default PostgreSQL port
  database: "Adminstration",
});

client
  .connect()
  .then(() => {
    // minor change
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

module.exports = client;
