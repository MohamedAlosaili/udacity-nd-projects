import { nav, container, result } from "./app";
import { handleSaveAndDelete } from "./listeners";
import travelCard, { createPreviousQueries, statusMessage } from "./components";

export function setMinDate(isEndDate, selectedDate) {
  const date = isEndDate ? new Date(selectedDate) : new Date();

  isEndDate && date.setDate(date.getDate() + 1);

  const minDate = reformatDate(date.toLocaleDateString());

  return minDate;
}

export async function showResult({ location, startDate, endDate }) {
  try {
    const coordinate = await getDataFromServer({
      location,
      apiName: "GEONAME",
    });

    const { lat, lng } = coordinate?.geonames[0];

    const [weather, image] = await Promise.all([
      getDataFromServer({
        lat,
        lng,
        startDate,
        endDate,
        apiName: "WEATHER",
      }),
      getDataFromServer({
        location,
        apiName: "PIXABAY",
      }),
    ]);

    const timestamp = Date.now();
    sessionStorage.setItem(
      "new-query",
      JSON.stringify({
        weather,
        image: image?.hits,
        id: timestamp,
        isSaved: true,
      })
    );

    result.innerHTML = "";
    result.insertAdjacentHTML(
      "beforeend",
      travelCard(weather, image?.hits, false, timestamp)
    );
    addBtnListener();
  } catch (error) {
    result.innerHTML = `<span class="placeholder">Oops, Something went wrong please try again later!</span>`;
    console.log(error);
  }
}

export async function getDataFromServer(body) {
  try {
    const res = await fetch("http://localhost:3000/fetchData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    });

    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export function reformatDate(date) {
  const d = new Date(date);

  const newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return newDate;
}

export function addBtnListener() {
  const btn = document.querySelector("[data-btn]");

  btn.removeEventListener("click", handleSaveAndDelete);
  btn.addEventListener("click", handleSaveAndDelete);
}

export async function saveQuery() {
  const newQuery = JSON.parse(sessionStorage.getItem("new-query"));
  const queries = JSON.parse(localStorage.getItem("queries")) ?? [];

  const isExist = queries.some((query) => query.id === newQuery.id);

  if (!isExist) {
    queries.push(newQuery);
    localStorage.setItem("queries", JSON.stringify(queries));
    resetContainerAndResult();
    statusMessage("Save");
  }
}

export async function deleteQuery(id) {
  const queries = JSON.parse(localStorage.getItem("queries"));

  const newQueries = queries.filter((query) => query.id !== +id);

  localStorage.setItem("queries", JSON.stringify(newQueries));

  if (newQueries.length === 0) resetContainerAndResult("result");
  statusMessage("Delete");
}

function resetContainerAndResult(type) {
  createPreviousQueries();

  if (type === "result") {
    result.innerHTML = `<span class="placeholder">No result yet</span>`;
    nav.classList.toggle("nav-result");
    container.classList.toggle("container-result");
  }
}
