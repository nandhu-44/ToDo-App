const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
dotenv.config();

app.use(bodyParser.json());
app.use(cors(
  {
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  },
));

console.clear();

require("./database/mongoose.js");

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api", routes);

app.listen(8000, () => console.log("Listening on port 8000"));

process.on("unhandledRejection", (err) => {
  console.log(err);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});
