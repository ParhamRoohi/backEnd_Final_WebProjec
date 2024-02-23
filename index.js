
const express = require("express");
const postgres = require('postgres');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const PORT = 3000;

let PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID;
PGHOST = 'ep-flat-hill-a5zkc9o9.us-east-2.aws.neon.tech'
PGDATABASE = 'finalProject'
PGUSER = 'par81hamroohi@gmail.com'
PGPASSWORD = 'v9lSfezO6cCg'
ENDPOINT_ID = 'ep-flat-hill-a5zkc9o9'

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});



//Products request
//Get all products & Searech by name & brand
app.get('/products', async (req, res) => {
  try {
    let name = req.query.name;
    let brand = req.query.brand;
    name = name ? name.toLowerCase() : '';
    brand = brand ? brand.toLowerCase() : '';
    let query = sql`SELECT * FROM products`;
    if (!brand & !name) {
      query = await sql`SELECT * FROM products`;
      res.send(query);
    }
    else if (name) {
      query = await sql`${query} WHERE LOWER(name) LIKE '%' || ${name} || '%'`;
      res.send(query);
    }
    else if (brand) {
      query = sql`${query} WHERE LOWER(brand) LIKE '%' || ${brand} || '%'`;//why dont work at postman
      res.send(query);
    }
    else if (req.query.sort) {
      query = await sql`SELECT * FROM products ORDER BY price`;
      res.send(query);

    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Get product with id
app.get("/product/:id", async (req, res) => {
  try {
    const productID = req.params.id;
    let query = await sql`SELECT * FROM products WHERE id = ${productID}`;
    res.send(query);
  }
  catch (error) {
    res.status(500);
  };
});

//Delete products
app.delete("/products/:id", async (req, res) => {
  const productsId = req.params.id;
  try {

    let query = await sql`DELETE FROM products WHERE id = ${productsId}`;
    res.send(query);
  }
  catch (error) {
    console.log("Error to delete product:",error)
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create new prouducts
app.post("/products", async (req, res) => {
  try {
    const { brand, name, description, amount, storage, price } = req.body;
    const query = await sql`INSERT INTO products (brand, name, description, amount, storage, price) VALUES ( ${brand}, ${name}, ${description}, ${amount},${storage},${price})`
    console.log(query);
    res.status(200).send(query)
  }
  catch (error) {
    console.log("Error to create product:",error)
    res.status(500).json({ error: "Internal server error" });
  }

})

//Edit product
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { amount, price } = req.body;

    const query = await sql`UPDATE products SET amount = ${amount}, price = ${price} WHERE id = ${productId}`;

    res.send(query);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//User request
//Get user
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    let query = await sql`SELECT * FROM users WHERE id = ${userId}`;
    res.send(query);
  }
  catch (error) {
    res.status(500);
  };
});

//Login
app.post("/LoginPage", async (req, res) => {
  try {
    const { username, password } = req.body;
    const validUser = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
    console.log(validUser);
    if (validUser && validUser.length > 0) {
      res.send({ user: { id: validUser[0].id, username: validUser[0].username, is_admin: validUser[0].is_admin } });
    } else {
      res.status(401).json({ message: 'Wrong username and/or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () =>
  console.log(` My App listening at http://localhost:${PORT}`)
);
