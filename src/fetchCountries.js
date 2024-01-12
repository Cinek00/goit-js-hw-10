// fetchCountries.js
const fetchCountries = (name) => {
  // Dodajemy parametry do zapytania, aby otrzymać tylko potrzebne dane
  const queryParams = new URLSearchParams({
    fields: 'name.official,capital,population,flags.svg,languages'
  });

  return fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?${queryParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.map(country => ({
      officialName: country.name.official,
      capital: country.capital,
      population: country.population,
      flag: country.flags.svg,
      languages: Object.values(country.languages).join(', ')
    })))
    .catch(error => console.error('Fetching error:', error));
};

export { fetchCountries };