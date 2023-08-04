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
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello Welcome to LABTIF API!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running on ${port}`);
});
