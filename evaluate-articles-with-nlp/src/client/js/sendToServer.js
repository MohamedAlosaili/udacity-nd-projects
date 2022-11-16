export async function sendToServer(bodyValue) {
  const res = await fetch("http://localhost:3000/callMeaningApi", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyValue),
  });

  try {
    const data = await res.json();

    Client.updateUI(data.response);
    return data.response.text;
  } catch (e) {
    loader.classList.remove("active");

    alert("Opps, something went wrong!");
    console.log(e);
  }
}
