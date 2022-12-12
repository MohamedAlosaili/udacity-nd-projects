const API_URL = {
  GEONAME: ({ location }) =>
    `http://api.geonames.org/searchJSON?name_equals=${location}&username=m0hamed`,
};

async function fetchData({ apiName, ...arg }) {
  try {
    const res = await fetch(API_URL[apiName](arg));

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
}

test("Testing the fetchData() functionality", () => {
  expect(fetchData).toBeDefined();
});

test("The data is object", async () => {
  const data = await fetchData({ apiName: "GEONAME", location: "Riyadh" });

  expect(typeof data).toBe("object");
});
