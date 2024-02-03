// import "dotenv/config";
// const express = require("express");
// const postgres = require("postgres");
// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//   next();
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// let PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID;
// PGUSER = decodeURIComponent(PGUSER);

// PGHOST = "ep-flat-hill-a5zkc9o9.us-east-2.aws.neon.tech";
// PGDATABASE = "finalProject";
// PGUSER = "par81hamroohi@40gmail.com";
// PGPASSWORD = "v9lSfezO6cCg";
// ENDPOINT_ID = "ep-flat-hill-a5zkc9o9";

// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: "require",
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

// app.get("/products", (request, response) => {
//   sql`SELECT * FROM products`.then((result) => {
//     response.send(result);
//   });
// });

// app.listen(port, () =>
//   console.log(` My App listening at http://localhost:${port}`)
// );




// ____________________________

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

// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result);
// }

// getPgVersion();