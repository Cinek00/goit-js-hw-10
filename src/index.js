
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleSearch, 300));

async function handleSearch() {
  const searchTerm = searchBox.value.trim();
  if (!searchTerm) {
    clearUI();
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);
    if (countries.length === 0) {
      Notiflix.Notify.warning('Oops, there is no country with that name');
      return;
    }

    if (countries.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      clearUI();
      return;
    }

    if (countries.length >= 2 && countries.length <= 10) {
      renderCountryList(countries);
    }

    if (countries.length === 1) {
      renderCountryInfo(countries[0]);
    }
  } catch (error) {
    Notiflix.Notify.failure(`Error: ${error.message}`);
  }
}

function clearUI() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
  const countriesHTML = countries
    .map((country) => `<li><img src="${country.flags.svg}" alt="${country.name.official}">${country.name.official}</li>`)
    .join('');
  countryList.innerHTML = countriesHTML;
  countryInfo.innerHTML = '';
}

function renderCountryInfo(country) {
  const languages = country.languages.map((language) => language.name).join(', ');
  const countryHTML = `
    <div>
      <img src="${country.flags.svg}" alt="${country.name}">
      <h2>${country.name.official}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    </div>
  `;
  countryList.innerHTML = '';
  countryInfo.innerHTML = countryHTML;
}
