const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//const chalk = require('chalk').default;

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//DB connection

DB_USERNAME = process.env.DB_USERNAME;
DB_PASSWORD = process.env.DB_PASSWORD;

const db_link = `mongodb://127.0.0.1:27017/resepApp`;

mongoose
  .connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (db) {
    console.log("__ DB CONNECTED __");
  })
  .catch(function (err) {
    console.log(err);
  });

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middlewares
//to allow cross origin requests
app.use(
  cors({
    origin: [
      "http://localhost:7000",
      "http://localhost:3000",
      "https://recipe-app-server-five.vercel.app",
      "https://recipe-server-kidx.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies for API endpoints
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for HTML form submissions
app.use(bodyParser.json()); // Parse JSON bodies for API endpoints
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("tiny"));

// Define custom colors using chalk for morgan logs
// app.use(morgan((tokens, req, res) => {
//     const method = tokens.method(req, res);
//     const url = tokens.url(req, res);
//     const status = chalk.keyword('green')(tokens.status(req, res));
//     const responseTime = chalk.keyword('cyan')(tokens['response-time'](req, res) + ' ms');
//     return `${method} ${url} ${status} ${responseTime}`;
//   }));

//routes
const userRoutes = require("./routes/userRoute.js");
app.use("/api/v1", userRoutes);
const recipeRoutes = require("./routes/recipeRoute.js");
app.use("/api/v1", recipeRoutes);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
