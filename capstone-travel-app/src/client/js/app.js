import { submitForm, handleNavBtns } from "./listeners";
import { setMinDate } from "./functions";
import { createPreviousQueries } from "./components";

export const form = document.getElementById("form");
export const selectLabel = document.querySelector("[for='select']");
export const startDataEl = document.getElementById("start-date");
export const endDataEl = document.getElementById("end-date");
export const nav = document.querySelector("#nav");
export const navBtn = document.querySelectorAll("[data-nav-btn]");
export const container = document.getElementById("container");
export const result = document.getElementById("result");

createPreviousQueries();

// Set form & navBtns listeners
form.addEventListener("submit", submitForm);

navBtn.forEach((btn) => {
  btn.addEventListener("click", handleNavBtns);
});

// Set min attribute for date inputs
startDataEl.setAttribute("min", setMinDate());
endDataEl.setAttribute("min", setMinDate(true));

// Reset min attr of endDataEl on every changes that occurs on startDataEl
startDataEl.addEventListener("change", (e) => {
  endDataEl.setAttribute("min", setMinDate(true, e.target.value));
  endDataEl.value = "";
});
