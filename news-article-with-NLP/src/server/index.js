const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");
const FormData = require("form-data");

const app = express();

const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("/dist/index.html");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`###___ Server running on PORT: ${PORT} ___###`);
});

app.post("/callMeaningApi", async (req, res) => {
  const { text } = req.body;

  const response = await getMeaningAnalysis(text);

  res.send({ response });
});

async function getMeaningAnalysis(txt) {
  const form = new FormData();
  form.append("key", API_KEY);
  form.append("lang", "en");
  form.append("txt", txt);

  return await fetch("https://api.meaningcloud.com/sentiment-2.1", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));
}
