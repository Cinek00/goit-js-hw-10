// fetchCountries.js
const fetchCountries = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.map(country => country.name.common))
    .catch(error => console.error('Fetching error:', error));
};

export { fetchCountries };