
const fetchCountries = (name) => {
  const queryParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages'
  });

  return fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?${queryParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error Response: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => data.map(country => {
      return {
        nameCommon: country.name.common,
        officialName: country.name.official,
        capital: country.capital ? country.capital[0] : 'No capital',
        population: country.population,
        flag: country.flags.png,
        languages: Object.values(country.languages).join(', ')
      };
    }))
    .catch(error => {
      console.error('Fetching error:', error);
      return [];
    });
};

export { fetchCountries };