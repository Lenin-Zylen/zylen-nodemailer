const dotenv = require('dotenv');
dotenv.config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const { initializeApp } = require('firebase/app');
// let port = process.env.PORT || 4000;

// const firebaseConfig = require("./app/config/firebase.config")

// initializeApp(firebaseConfig)
// console.log(firebaseConfig, 'checking the firebase condif')

const router = require("./app/routers/route");

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
  res.send("Hello World");
});


// app.listen(port, () => console.log(`Server listening on port ${port}`));

exports.app = functions.https.onRequest(app);
