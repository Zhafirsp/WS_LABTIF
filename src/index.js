const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const port = process.env.APP_PORT;

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://api-staging-labtif.cyclic.cloud",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(cookieParser());

// Welcome Page
app.get("/", (req, res) => {
  res.send(`<h1>Hello Welcome to LABTIF API!</h1>
  <p>You can access endpoints starting with /v1</p>
  <p>API documentation is available at <a href="https://documenter.getpostman.com/view/18343779/2s93z3gRGU">Visit Postman Documentation</a></p>
  `);
});

app.use("/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running on ${port}`);
});
