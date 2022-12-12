import { container, nav, navBtn, result } from "./app";
import { addBtnListener, saveQuery, deleteQuery } from "./functions";
import travelCard from "./components";

export function submitForm(e) {
  e.preventDefault();

  const formData = {
    location: e.target[0].value,
    startDate: Client.reformatDate(e.target[1].value),
    endDate: Client.reformatDate(e.target[2].value),
  };

  nav.classList.add("nav-result");
  container.classList.add("container-result");
  result.innerHTML = `<div class="loader"></div>`;

  Client.showResult(formData);
  e.target[0].value = e.target[1].value = e.target[2].value = "";
}

export function handleNavBtns(e) {
  navBtn.forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");

  nav.classList.toggle("nav-result");
  container.classList.toggle("container-result");
}

export function handleSaveAndDelete(e) {
  const { id, btn } = e.target.dataset;

  if (btn === "save") saveQuery();
  else deleteQuery(id);
}

export function handleResultSelection(e, queries) {
  if (e.target.value !== "") {
    nav.classList.add("nav-result");
    container.classList.add("container-result");
    result.innerHTML = `<div class="loader"></div>`;

    const { weather, image, isSaved, id } = queries.find(
      (query) => query.id === +e.target.value
    );

    result.innerHTML = "";
    result.insertAdjacentHTML(
      "beforeend",
      travelCard(weather, image, isSaved, id)
    );
    addBtnListener();
  }
}
