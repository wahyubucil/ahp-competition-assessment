const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rank = require("./src/rank");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send({ status: "Awesome!" });
});

app.post("/ranks", rank.getData);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
