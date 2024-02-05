
const express = require("express");
const postgres = require('postgres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 4000;

PGHOST='ep-flat-hill-a5zkc9o9.us-east-2.aws.neon.tech'
PGDATABASE='finalProject'
PGUSER='par81hamroohi@gmail.com'
PGPASSWORD='v9lSfezO6cCg'
ENDPOINT_ID='ep-flat-hill-a5zkc9o9'

// PGUSER = decodeURIComponent(PGUSER);

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



app.get("/products", (request, response) => {
  sql`SELECT * FROM products`.then((result) => {
    response.send(result);
  });
});

app.listen(port, () =>
  console.log(` My App listening at http://localhost:${port}`)
);
