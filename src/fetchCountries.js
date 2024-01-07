// fetchCountries.js
export const fetchCountries = async (name) => {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,official,flags,capital,population,languages`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
