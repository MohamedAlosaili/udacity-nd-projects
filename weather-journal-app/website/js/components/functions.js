import { getData, postData } from "./asyncFunctions.js";
import messageHandling from "./messageHandling.js";

/* ___ API credentials ___ */
const API_KEY = "274c1845d97be8c3940ee59c276d28fa";
const location_API = (zip) =>
  `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`;
const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

/* ___ DOM Elements ___ */
const loader = document.getElementById("loader");
const selectContainer = document.getElementById("select-container");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const contentEl = document.getElementById("content");

/* ___ Sync Functions ___ */
/**
 * @description
 *          - Getting latitude and longitude from the given zip code
 *          - passing latitude and longitude to weather api to get data
 *          - post data + content from the user to our server (our api)
 *          - Handling any errors with catch method
 * @param {number} zipVal Zip code
 * @param {string} feelingsVal feelings content.
 */
export function callAPI(zipVal, feelingsVal) {
  loader.classList.add("active");

  getData(location_API(zipVal))
    .then((data) => {
      const { lat, lon } = data;

      getData(API_URL(lat, lon)).then((data) => {
        const date = `${new Date()}`;

        const newEntry = {
          date: date.substring(0, date.indexOf("GMT") - 1),
          temp: Math.round(data.main.temp),
          content: feelingsVal,
        };

        postData("/addWeatherData", newEntry).then((data) => {
          messageHandling(data.message, false);
          updateUI();
        });
      });
    })
    .catch((error) => {
      loader.classList.remove("active");
      messageHandling(
        "Oops, some thing went wrong try again or use another zip code",
        true
      );
    });
}

/**
 * @description
 *          - Changing the innerHTML of date, temp, and content by retrieving data from the server
 *          - if isSelected false the object will be the last one or will search for the given value
 * @param {boolean} isSelected If it new or selected from history
 * @param {string} selectedValue the value of the selected object from history
 */
function updateUI(isSelected, selectedValue) {
  getData("/allWeatherData").then((projectData) => {
    loader.classList.remove("active");

    const data = projectData.data;
    let obj = data[data.length - 1];

    if (isSelected) {
      const selectedObj = data.find((obj) => obj.date === selectedValue);

      obj = selectedObj;
    }

    const { date, temp, content } = obj;

    selectContainer.innerHTML = "";
    selectContainer.insertAdjacentElement("afterbegin", updateHistory(data));
    historyListener();

    dateEl.innerHTML = `<span class="label">Date: </span> ${date}`;
    tempEl.innerHTML = `<span class="label">Temperature: </span>${temp} degrees`;
    contentEl.innerHTML = `<span class="label">Feelings: </span>${content}`;
  });
}

/**
 * @description Map over the data retrieved from the server and create select element and options
 * @param {object} data Array of data from the server
 */
function updateHistory(data) {
  const selectEl = document.createElement("select");
  selectEl.id = "history";

  const placeholder = `
      <option value="">-- Select from history --</option>
    `;

  selectEl.insertAdjacentHTML("afterbegin", placeholder);

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.date;
    option.innerText = item.date;

    selectEl.append(option);
  });

  return selectEl;
}

/**
 * @description Listening for the changes on the history (select) element and update UI depend on the changes
 */
function historyListener() {
  const historyList = document.querySelector("#history");

  historyList.addEventListener("change", (e) => {
    loader.classList.add("active");
    updateUI(true, e.target.value);
  });
}
