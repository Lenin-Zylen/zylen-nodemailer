const dotenv = require('dotenv');
dotenv.config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const router = require("./app/routers/route");
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(cors());
app.use("/api", router);

// method - get
// public
// get user
app.get("/", (req, res) => {
  res.send("Hello Production World");
});


// app.listen(port, () => console.log(`Server listening on port ${port}`));

exports.app = functions.https.onRequest(app);
