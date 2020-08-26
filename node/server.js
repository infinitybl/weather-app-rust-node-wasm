const express = require("express");
const config = require("./config.js");
const fetch = require("node-fetch");
const { parse_json } = require("../pkg/weather_lib.js");

const app = express();
const port = 8080;
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

const bodyParser = require("body-parser");

app.use(bodyParser.json());

async function getWeatherResults(query) {
  const weather = await fetch(
    `${config.weatherAPI.baseURL}weather?q=${query}&units=metric&APPID=${config.weatherAPI.key}`
  ).catch((err) => {
    console.log(err);
  });
  return weather.json();
}

app.get("/", (req, res) => res.redirect("/index.html"));

app.post("/getWeatherResults", async function (req, res) {
  if (!req.body.searchQuery) {
    return res
      .status(400)
      .send(`You must pass in the 'searchQuery' parameter in the request body`);
  } else {
    let result = await getWeatherResults(req.body.searchQuery);
    console.log(result);
    if (result.cod === "404") {
      return res.status(result.cod).send(result.message);
    } else {
      result = parse_json(JSON.stringify(result));
    }
    return res.status(200).send(JSON.parse(result));
  }
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
