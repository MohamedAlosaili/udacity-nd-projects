/**
 * @description Handle any messages by passing the message content and the type of message
 * @param {string} message Content of message to be displayed
 * @param {boolean} isError Type of message Error or Success.
 */
export default function (message, isError) {
  const box = document.createElement("div");
  box.className = `message-box ${isError ? "error" : "success"}`;

  box.innerText = message;

  const mgContainer = document.getElementById("messages-container");

  mgContainer.innerHTML = "";
  mgContainer.insertAdjacentElement("afterbegin", box);

  box.addEventListener("animationend", () => box.remove());
}
