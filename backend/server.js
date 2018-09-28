"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routers for each Resource
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const tradesRouter = require("./routes/trades");

// Mount all resource routers
app.use("/users", usersRouter(knex));
app.use("/posts", postsRouter(knex));
app.use("/trades", tradesRouter(knex));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("API server listening on port " + PORT);
});
