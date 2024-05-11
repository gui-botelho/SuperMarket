const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

//SEPARATE THIS FROM THE REST OF COMPONENTS SO IT CAN BE NPM STARTED

const db = knex({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/productList", (request, response) => {
  db.select("produto")
    .from("products")
    .distinct()
    .then((data) => {
      response.json(data);
    });
});

app.get("/localList", (request, response) => {
  db.select("local")
    .from("products")
    .distinct()
    .then((data) => {
      response.json(data);
    });
});

app.post("/insertProduct", (request, response) => {
  const data = request.body.insertProduct;

  if (data.quantidade === "") {
    data.quantidade = 0;
  }
  if (data.preco === "") {
    data.preco = 0;
  }
  console.log(data);
  db("products")
    .insert(data)
    .then(() =>
      db
        .select("produto")
        .from("products")
        .distinct()
        .then((newProds) => response.json(newProds))
    );
});

app.post("/previousPurchases", (request, response) => {
  const name = request.body;
  db.select("*")
    .from("products")
    .where({ produto: name.name })
    .then((data) => {
      console.log(data);
      response.json(data);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running locally on port " + port);
});
