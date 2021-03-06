/* eslint-disable no-unused-vars */
// load .env data into process.env
const ENV = process.env.ENV || "development";

if (ENV === 'development') {
  require('dotenv').config();
}

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');


const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(cookieSession({
  name: 'session',
  keys: ['secret_keys'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes
// below with your own
const loginRoutes = require("./routes/login");
const mapsRoutes = require("./routes/maps");
const markersRoutes = require("./routes/markers");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", loginRoutes(db));
app.use("/maps", mapsRoutes(db));
app.use("/markers", markersRoutes(db));

// Note: mount other resources here, using the same pattern above




// ```
// B    GET /maps
// R    GET /maps/1/pins
// E    POST /maps/1
// A    POST /maps/
// D    POST /maps/1
// ```




// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVars = { id: req.session.user_id };
  res.render('index.ejs', templateVars);
});

// app.post("/", (req, res) => {
//   req.db.query(`
//   INSERT INTO maps (user_id)
//   VALUES (1)
//   `);
//   console.log(res);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} 😎`);
});
