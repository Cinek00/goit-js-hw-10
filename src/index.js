import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const updateCountryList = (countries) => {
  const countryListElement = document.querySelector('.country-list');
  countryListElement.innerHTML = '';

  countries.forEach((country) => {
    const listItem = document.createElement('li');
    listItem.style.listStyle = 'none';
    listItem.style.marginBottom = '10px';

    const flagImage = document.createElement('img');
    flagImage.src = country.flag;
    flagImage.alt = `Flaga ${country.nameCommon}`;
    flagImage.style.width = '20px';
    flagImage.style.height = '15px';
    flagImage.style.marginRight = '10px';

    listItem.appendChild(flagImage);
    listItem.appendChild(document.createTextNode(country.nameCommon));
    countryListElement.appendChild(listItem);
  });
};


const updateCountryInfo = (country) => {
  const countryInfoElement = document.querySelector('.country-info');
  countryInfoElement.innerHTML = '';

  if (!country) return;

  const { officialName, capital, population, flag, languages } = country;

  countryInfoElement.innerHTML = `
    <h2>${officialName}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population.toLocaleString()}</p>
    <p>Languages: ${languages}</p>
    <img src="${flag}" alt="Flaga ${officialName}" />

  `;
};


const searchCountries = debounce(() => {
  const searchBox = document.getElementById('search-box');
  const searchTerm = searchBox.value.trim();

  if (!searchTerm) {
    updateCountryList([]);
    updateCountryInfo(null);
    return;
  }

  fetchCountries(searchTerm)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        updateCountryList([]);
        updateCountryInfo(null);
      } else {
        updateCountryList(countries);
        updateCountryInfo(countries[0] || null);
      }
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
      Notiflix.Notify.failure('Error fetching data. Please try again later.');
    });
}, 300);

document.getElementById('search-box').addEventListener('input', searchCountries);