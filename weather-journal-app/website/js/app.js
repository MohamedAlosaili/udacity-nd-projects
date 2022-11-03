import { callAPI } from "./components/functions.js";

/* ___ DOM Elements ___ */
const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

/* ___ Event Listeners ___ */
generate.addEventListener("click", processingData);

/* ___ Sync Functions ___ */
function processingData() {
  const zipVal = zip.value;
  const feelingsVal = feelings.value;

  zip.value = "";
  feelings.value = "";

  if (zipVal && feelingsVal) {
    callAPI(zipVal, feelingsVal);
  }
}
