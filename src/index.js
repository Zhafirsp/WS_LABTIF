const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const port = process.env.APP_PORT;

const app = express();

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running on ${port}`);
});
