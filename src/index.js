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
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan origin frontend Anda
    methods: ["GET", "POST", "PUT", "DELETE"], // Atur metode permintaan yang diizinkan
    credentials: true, // Jika Anda mengirimkan cookie
  })
);

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
