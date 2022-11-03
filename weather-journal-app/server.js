const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const projectData = {
  data: [],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

const port = 8000;

app.listen(port, listening);

function listening() {
  console.log(`Server is Running on port ${port}`);
}

app.get("/allWeatherData", getWeatherData);

function getWeatherData(req, res) {
  res.send(projectData);
}

app.post("/addWeatherData", postWeatherData);

function postWeatherData(req, res) {
  const { date, temp, content } = req.body;

  const newEntry = {
    date,
    temp,
    content,
  };

  projectData.data.push(newEntry);

  res.send({ message: "New entry added successfully" });
}
