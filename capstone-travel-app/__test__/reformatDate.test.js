function reformatDate(date) {
  const d = new Date(date);

  const newDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return newDate;
}

test("Testing the reformatDate() functionality", () => {
  expect(reformatDate).toBeDefined();
});

test("reformat date 12/11/2022 to 2022-12-11", () => {
  expect(reformatDate("12/11/2022")).toBe("2022-12-11");
});
