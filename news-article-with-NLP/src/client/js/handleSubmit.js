const loader = document.getElementById("loader");

export function handleSubmit(event) {
  event.preventDefault();

  const textArea = document.getElementById("textarea");
  console.log("HandleSubmit Fire");

  if (+textArea.value === 0) {
    alert("You must enter a valid text");
    return false; // For Testing
  }

  loader.classList.add("active");

  const bodyValue = {
    text: textArea.value,
  };

  Client.sendToServer(bodyValue);

  return true; // For Testing
}
