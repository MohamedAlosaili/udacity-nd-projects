import { handleSubmit } from "../src/client/js/handleSubmit";

test("Testing the handleSubmit() functionality", () => {
  expect(handleSubmit).toBeDefined();
});

test("Testing the handleSubmit() returns", () => {
  expect(handleSubmit).toBeTruthy();
});
