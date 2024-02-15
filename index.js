
const express = require("express");
const postgres = require('postgres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const port = 3000;

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
//filter by brand & get all products & Searech by name 
app.get('/products', async (req, res) => {
  try {
    let name = req.query.name;
    name = name ? name.toLowerCase() : '';
    let brand = req.query.brand;
    brand = brand ? brand.toLowerCase() : '';
    let query = sql`SELECT * FROM products`;
    if (!brand & !name) {
      sql`SELECT * FROM products`.then((result) => {
        res.send(result);
      });
    }
    else if (name) {
      query = sql`${query} WHERE LOWER(name) LIKE '%' || ${name} || '%'`;
      const result = await query;
      res.send(result);
    }
    else {
      query = sql`${query} WHERE LOWER(brand) LIKE '%' || ${brand} || '%'`;
      const result = await query;
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



// delete products
app.delete("/products/:id", (req, res) => {
  const productsId = req.params.id;

  sql`DELETE FROM products WHERE id = ${productsId}`
    .then(() => {
      res.send({ message: `Product with ID ${productsId} has been deleted.` });
    })
    .catch((error) => {
      res.status(500).send("Error deleting product.");
    });
});

//create new prouducts
app.post("/products", (req, res) => {
  const { brand, name, description, amount, storage, price } = req.body;
  sql`INSERT INTO products (brand, productName, description, amount, storage, price) VALUES ( ${brand}, ${name}, ${description}, ${amount},${storage},${price})`.then((result) => {
    res.send({
      message: `New product was created. `
    })
    res.send(result);
  })
    .catch((error) => {
      res.status(500).send("Error creating product.");
    });

})


app.listen(port, () =>
  console.log(` My App listening at http://localhost:${port}`)
);
