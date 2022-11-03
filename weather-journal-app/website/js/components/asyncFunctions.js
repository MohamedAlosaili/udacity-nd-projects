/**
 * @description Getting any data from any API by passing the url of that API.
 * @param {string} url API url
 */
export const getData = async (url = "") => {
  const res = await fetch(url);

  try {
    if (!res.ok) throw Error(res.message);

    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * @description Post data to an API by passing the url and the object of data to be posted.
 * @param {string} url API url
 * @param {object} data object of the data to be posted
 */
export const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
