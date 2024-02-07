
const express = require("express");
const postgres = require('postgres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;

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



app.get("/products", async(req, res) => {
  // sql `SELECT * FROM products`.then((result) => {
    const products = [
      {id:"1", brand: "Hello", name: "Par09154093785ham˚-˚" ,description:"3hrfuyf",amount:134, storage:12, price:5634652},
      // {id:"2", text: "Hello", createdBy: "Hediye" },
    ];
    res.send(products);
  // });
});

// app.delete("/products/:id", (req, res) => {
//   const productsId = req.params.id;

//   sql`DELETE FROM tasks WHERE id = ${productsId}`
//     .then(() => {
//       res.send({ message: `Product with ID ${productsId} has been deleted.` });
//     })
//     .catch((error) => {
//       res.status(500).send("Error deleting product.");
//     });
// });
// app.post("/products", (req, res) => {
//   const {brand, name, description, amount, storage, price } = req.body;
//   sql`INSERT INTO products (productName, description) VALUES ( ${brand}, ${name}, ${description}, ${amount},${storage},${price})`.then((result) => {
//     res.send({
//       message: `New product was created. `
//     })
//     res.send(result);
//   })
//     .catch((error) => {
//       res.status(500).send("Error creating product.");
//     });

// })


app.listen(port, () =>
  console.log(` My App listening at http://localhost:${port}`)
);
