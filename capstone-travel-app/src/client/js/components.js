import { selectLabel } from "./app";
import { handleResultSelection } from "./listeners";

export default function travelCard(weather, image, isSaved, id) {
  return `
        <div class="card">
            <div class="wrapper">
              <h3 class="location">${weather.city_name}</h3>
              <div>
                ${
                  isSaved
                    ? `<button class="btn delete" data-btn="delete" data-id="${id}">Delete</button>`
                    : `<button class="btn" data-btn="save" data-id="${id}">Save</button>`
                }
              </div>
            </div>
            ${cardImgs(image, weather.city_name)}
            ${date(weather.data)}
            <div>
                <h3 class="title">
                    ${weather.city_name} weather forecast for the next 16 days
                </h3>
                ${forecastCards(weather.data)}
            </div>
        </div>
    `;
}

function cardImgs(imgs = [], city) {
  const notFound =
    "https://dummyimage.com/200/232946/ffffff.png&text=Image+Not+Found";

  const images = [...imgs];

  let gallery = "";

  for (let i = 0; i < 4; i++) {
    const src = images[i] ? images[i].webformatURL : notFound;

    gallery += `<img src=${src} alt="${city} image" class="img" />`;
  }

  return `
    <div class="gallery">
      ${gallery}
    </div>
  `;
}

function date(forecast) {
  const formatDate = (date) => date.split("-").join("/");

  return `
        <div class="date">
            <span>${formatDate(forecast[0].datetime)}</span> - 
            <span>${formatDate(forecast[forecast.length - 1].datetime)}</span> 
        </div>
    `;
}

function forecastCards(forecast) {
  let cards = "";

  forecast.forEach((day) => (cards += forecastCard(day)));
  return `
        <div class="card-container">
            ${cards}
        </div>
    `;
}

function forecastCard(weather) {
  const date = `${new Date(weather.datetime)}`.slice(0, 10);

  const degree = (num) => Math.round(num);

  return `
        <div class="forecast">
            <div class="date">${date}</div>
            <div class="">
                <img src="https://www.weatherbit.io/static/img/icons/${
                  weather.weather.icon
                }.png" alt="Weather Icon" class="img" />
                <p class="describe">${weather.weather.description}</p>
            </div>
            <div class="degrees">
                ${degree(weather.high_temp)} / ${degree(weather.low_temp)}
            </div>
        </div>
    `;
}

export function createPreviousQueries() {
  const queries = JSON.parse(localStorage.getItem("queries"));

  if (queries?.length > 0) {
    selectLabel.style.display = "flex";
    const selectFragment = document.createDocumentFragment("div");
    const select = document.createElement("select");
    const labelText = document.createTextNode("See previous results: ");
    let children = `<option value=""> -- choose a result -- </option>`;

    queries.forEach(
      (query) =>
        (children += `<option value=${query.id}>${query.weather.city_name}</option>`)
    );

    select.className = "select";
    select.innerHTML = children;

    selectFragment.append(labelText, select);

    selectLabel.innerHTML = "";
    selectLabel.appendChild(selectFragment);

    select.removeEventListener("change", (e) =>
      handleResultSelection(e, queries)
    );
    select.addEventListener("change", (e) => handleResultSelection(e, queries));
  } else {
    selectLabel.style.display = "none";
  }
}

export function statusMessage(msg) {
  const message = document.createElement("div");
  message.className = `message ${msg === "Delete" ? "delete" : ""}`;
  message.id = "status-message";
  message.innerText = `${msg} successfully`;

  document.body.prepend(message);

  document
    .getElementById("status-message")
    .addEventListener("animationend", (e) => e.target.remove());
}
