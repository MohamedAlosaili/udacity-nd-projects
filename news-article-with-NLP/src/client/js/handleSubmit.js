function handleSubmit(event) {
  event.preventDefault();

  const textArea = document.getElementById("textarea");
  console.log(":: HandleSubmit ::");

  const bodyValue = {
    text: textArea.value,
  };

  (async function () {
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

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  })();
}

export { handleSubmit };
