export default function fetchCountries(name) {
  const url = `https://restcountries.eu/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}
