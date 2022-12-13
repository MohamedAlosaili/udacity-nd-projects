const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

const app = express();

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

// const { WEATHER, GEONAME, PIXABAY } = process.env;

/* Keys Shown in the repository for review purposes */
const WEATHER = "603d4269aed544d592234681f36d47ee";
const GEONAME = "m0hamed";
const PIXABAY = "31951857-2212fe3874b9278d3dfdd7a0f";

const API_URL = {
  WEATHER: ({ lat, lng }) =>
    `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER}&lat=${lat}&lon=${lng}`,
  GEONAME: ({ location }) =>
    `http://api.geonames.org/searchJSON?name_equals=${location}&username=${GEONAME}`,
  PIXABAY: ({ location }) =>
    `https://pixabay.com/api/?key=${PIXABAY}&q=${location}&category=places,travel,buildings&orientation=horizontal&image_type=photo`,
};

// Handle request from front-end
app.post("/fetchData", async (req, res) => {
  try {
    const response = await fetchData(req.body);

    res.send({ ...response });
  } catch (error) {
    res.send({ ...error });
  }
});

// Call API depend on the apiName passed from front-end
async function fetchData({ apiName, ...arg }) {
  try {
    const res = await fetch(API_URL[apiName](arg));

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
}
