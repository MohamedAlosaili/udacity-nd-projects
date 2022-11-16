export function updateUI(data) {
  const resultEl = document.getElementById("result");
  console.log(resultEl);
  resultEl.parentElement.classList.add("active");
  loader.classList.remove("active");

  const container = document.createElement("div");

  container.innerHTML = `
      <p class="info"><span class="label">Agreement: </span>${
        data.agreement[0] + data.agreement.slice(1).toLowerCase()
      }</p>
      <p class="info"><span class="label">Confidence: </span>${
        data.confidence
      }</p>
      <p class="info"><span class="label">Subjectivity: </span>${
        data.subjectivity[0] + data.subjectivity.slice(1).toLowerCase()
      }</p>
      <p class="info"><span class="label">Entered Text: </span><br>${
        data.text
      }</p>
    `;

  resultEl.innerHTML = "";
  resultEl.insertAdjacentElement("beforeend", container);

  return true;
}
