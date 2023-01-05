const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const env = require("dotenv");

const version = 1;
const routePrefix = `/api/${version}`;

env.config();

const app = express();

//DB Connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/balaji_store");

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

db.on("open", () => {
  console.log("Connection opened");
});

// end of db connection
app.use(cors());
app.use(bodyParser.json());
//routes

const authRoutes = require("./src/routes/auth.routes");
app.use(`${routePrefix}/auth`, authRoutes);

//routes
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app started on port : ${port}`);
});
