import { sendToServer } from "../src/client/js/sendToServer";

test("Testing the sendToServer() functionality", () => {
  expect(sendToServer).toBeDefined();
});

// test("Send Text To Server and excpect to see it", () => {
//   return sendToServer({ text: "text" }).then((data) => {
//     expect(data).toBe("text");
//   });
// });
