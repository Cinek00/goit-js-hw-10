import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
//update
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce(() => {
  const name = searchBox.value.trim();

  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.alert('Too many matches found. Please enter a more specific name.');
        return;
      }

      if (countries.length === 1) {
        showCountryInfo(countries[0]);
      } else if (countries.length > 0) {
        showCountryList(countries);
      }
    })
    .catch(error => {
      if (error.response.status === 404) {
        Notiflix.alert('Oops, there is no country with that name');
      }
    });
}, 300);

const showCountryList = countries => {
  countryList.innerHTML = countries
    .map(country => `
      <li>
        <img src="${country.flags.svg}" alt="${country.name.official}" />
        ${country.name.official}
      </li>
    `)
    .join('');
};

const showCountryInfo = country => {
  countryInfo.innerHTML = `
    <h1>${country.name.official}</h1>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <ul>
      ${country.languages.map(language => `<li>${language}</li>`).join('')}
    </ul>
  `;
};

searchBox.addEventListener('input', handleSearch);